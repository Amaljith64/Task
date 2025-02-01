from rest_framework import serializers
from .models import Category,ProgressLog,Resource



class CategorySerializer(serializers.ModelSerializer):
    resourceCount = serializers.SerializerMethodField()
    completedCount = serializers.SerializerMethodField()
    class Meta:
        model = Category
        fields = ('id','name', 'resourceCount', 'completedCount', 'created_at')

    def get_resourceCount(self, obj):
        return Resource.objects.filter(category=obj).count()
    
    def get_completedCount(self, obj):
        return ProgressLog.objects.filter(
            resource__category=obj,
            user=self.context['request'].user,
            completion_status=True).count()

class ProgressLogSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProgressLog
        fields = ('id', 'completion_status', 'time_spent', 'completion_date')

class ResourceSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name',read_only=True)
    completion_status = serializers.SerializerMethodField()
    created_at = serializers.DateTimeField(read_only=True)

    def get_completion_status(self,obj):
        user = self.context['request'].user
        progress_log = ProgressLog.objects.filter(resource=obj,user=user).first()

        return progress_log.completion_status if progress_log else False

    class Meta:
        model = Resource
        fields = (
            'id', 'title', 'description', 'type', 'category','category_name','completion_status','created_at'
        )

class ResourceSummarySerializer(serializers.Serializer):
    total_resources = serializers.IntegerField()
    total_completed = serializers.IntegerField()
    completion_percentage = serializers.FloatField()
    total_time_spent = serializers.IntegerField()
    category_breakdown = serializers.DictField(
        child=serializers.DictField(
            child=serializers.IntegerField()
        )
    )

class CategorySummarySerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    total_resources = serializers.IntegerField()
    completed_resources = serializers.IntegerField()
    total_time_spent = serializers.IntegerField()
    completion_percentage = serializers.FloatField()