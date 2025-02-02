from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CategorySerializer,ProgressLogSerializer,ResourceSerializer,ResourceSummarySerializer,CategorySummarySerializer
from .models import Category,ProgressLog,Resource
from rest_framework.views import APIView
from django.utils import timezone
from django.db.models import Count, Sum, F, FloatField,When,Case,Value
from django.db.models.functions import Coalesce,Cast
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.decorators import action
# Create your views here.


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.filter(created_by=self.request.user)

    def perform_create(self,serializer):
        serializer.save(created_by=self.request.user)

class ResourceViewSet(viewsets.ModelViewSet):
    serializer_class=ResourceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Resource.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=True,methods=['post'])
    def mark_complete(self,request,pk=None):
        resource = self.get_object()
        current_time = timezone.now()

        resource_created = resource.created_at
        time_diff = current_time - resource_created
        time_spent_minutes = int(time_diff.total_seconds() / 60)

        progress_log, created = ProgressLog.objects.get_or_create(
            resource=resource,
            user=request.user,
            defaults={
                'completion_status': True,
                'completion_date': current_time,
                'time_spent': time_spent_minutes
            }
        )

        if not created:
            progress_log.completion_status = True
            progress_log.completion_date = current_time
            progress_log.time_spent = time_spent_minutes
            progress_log.save()

        return Response({'message':'Resource marked as complete'},status=status.HTTP_200_OK)



class CategorySummaryView(APIView):

    def get(self,request,id):
        try:

            resource = Resource.objects.filter(user= request.user,category=id)

            category_summary = Category.objects.filter(
                    id=id, 
                    created_by=request.user
                ).annotate(
                    total_resources=Count('resources'),
                    completed_resources=Count(
                        'resources__progress_logs',
                        filter=F('resources__progress_logs__completion_status') == True
                    ),
                    total_time_spent=Coalesce(
                        Sum('resources__progress_logs__time_spent'), 
                        0
                    ),
                    completion_percentage=Case(
                        When(
                            total_resources=0,
                            then=Value(0.0)
                        ),
                        default=(Count(
                            'resources__progress_logs',
                            filter=F('resources__progress_logs__completion_status') == True
                        ) * 100.0 / Cast('total_resources', FloatField())),
                        output_field=FloatField()
                    ),
                    average_completion_time=Case(
                        When(
                            total_resources=0,
                            then=Value(0.0)
                        ),
                        default=Coalesce(
                            Sum('resources__progress_logs__time_spent') / Cast('total_resources', FloatField()),
                            0.0
                        ),
                        output_field=FloatField()
                    )
                ).first()
            
            if not category_summary:
                return Response(
                    {'error': 'Category not found'}, 
                    status=status.HTTP_404_NOT_FOUND
                )
            
            resource_breakdown = [ 
                {
                    'id':res.id,
                    'title': res.title,
                    'category_name': res.category.name,
                    'type': res.type,
                    'created_at':res.created_at,
                    'completion_status': ProgressLog.objects.filter(
                        resource=res, 
                        user=request.user
                    ).values_list('completion_status', flat=True).first() or False
                } for res in resource
            ]

            data = {
                'id': category_summary.id,
                'name': category_summary.name,
                'total_resources': category_summary.total_resources,
                'completed_resources': category_summary.completed_resources,
                'total_time_spent': category_summary.total_time_spent,
                'completion_percentage': category_summary.completion_percentage,
                'resource_breakdown':resource_breakdown
            }

            serializer = CategorySummarySerializer(data)
            return Response(serializer.data)
        except Exception as e:
            print(e,'err')
       
            return Response({'error': str(e)}, status=500)
    

    
class ResourceSummaryView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):

        try:
            resources = Resource.objects.filter(user=request.user)
            total_resources = resources.count()
            completed_resources = ProgressLog.objects.filter(
                user=request.user, 
                completion_status=True
            ).count()
            
            total_time_spent = ProgressLog.objects.filter(
                user=request.user
            ).aggregate(
                total=Coalesce(Sum('time_spent'), 0)
            )['total']

            completion_percentage = (
                (completed_resources / total_resources * 100) 
                if total_resources > 0 else 0
            )

            # Get category breakdown
            categories = Category.objects.filter(
                resources__user=request.user
            ).annotate(
                total=Count('resources'),
                completed=Count('resources__progress_logs',
                    filter=F('resources__progress_logs__completion_status')==True
                ),
            )

            category_breakdown = [
                {
                    'id':cat.id,
                    'name':cat.name,
                    'total': cat.total,
                    'completed': cat.completed,
                    'completion_percentage': (cat.completed / cat.total * 100) if cat.total > 0 else 0
                }for cat in categories
            ]

            resource_breakdown = [ 
                {
                    'id':res.id,
                    'title': res.title,
                    'category_name': res.category.name,
                    'type': res.type,
                    'created_at':res.created_at,
                    'completion_status': ProgressLog.objects.filter(
                        resource=res, 
                        user=request.user
                    ).values_list('completion_status', flat=True).first() or False
                } for res in resources
            ]

            data = {
                'total_resources': total_resources,
                'total_completed': completed_resources,
                'completion_percentage': completion_percentage,
                'total_time_spent': total_time_spent,
                'category_breakdown': category_breakdown,
                'resource_breakdown': resource_breakdown
            }

            serializer = ResourceSummarySerializer(data)
            return Response(serializer.data)

            return Response(data)
        except Exception as e:
            print(e,'errrrr')
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )



        