from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, register

router = DefaultRouter()
router.register('tasks', TaskViewSet, basename='task')

urlpatterns = [
    path('register/', register),
    path('', include(router.urls)),
]
