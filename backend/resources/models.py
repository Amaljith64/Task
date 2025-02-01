from django.db import models
from accounts.models import CustomUser

# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=100)
    created_by = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Resource(models.Model):
    Types = (
    ('ARTICLE','Article'),
    ('VIDEO','Video'),
    ('QUIZ','Quiz')
    )
    title = models.CharField(max_length=100)
    description = models.TextField()
    type = models.CharField(max_length=10,choices=Types)
    category = models.ForeignKey(Category,on_delete=models.CASCADE,related_name='resources')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE,related_name='resources')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class ProgressLog(models.Model):
    resource = models.ForeignKey(Resource,on_delete=models.CASCADE, related_name='progress_logs')
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE,related_name='progress_logs')
    completion_status = models.BooleanField(default=False)
    time_spent = models.IntegerField(default=0)
    completion_date = models.DateTimeField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)