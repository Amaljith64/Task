from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet,ResourceViewSet,ResourceSummaryView,CategorySummaryView


router = DefaultRouter()
router.register(r'resources', ResourceViewSet, basename='resource')
router.register(r'categories',CategoryViewSet,basename='category')

urlpatterns = [
    # Include all viewset routes
    path('resources/summary/', ResourceSummaryView.as_view(), name='resource-summary'),
    path('categories/<int:id>/summary/', CategorySummaryView.as_view(), name='category-summary'),
    
    path('', include(router.urls)),
]