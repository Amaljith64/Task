from django.contrib import admin
from .models import Category,ProgressLog,Resource

# Register your models here.

admin.site.register(Category)
admin.site.register(ProgressLog)
admin.site.register(Resource)