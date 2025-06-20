from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from django.http import HttpResponse
from django.contrib.auth.models import User
from .models import Task
from .serializers import TaskSerializer
import pandas as pd

@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password are required.'}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'User already exists.'}, status=400)

    User.objects.create_user(username=username, password=password)
    return Response({'message': 'User created successfully.'}, status=201)

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def export(self, request):
        tasks = self.get_queryset()
        data = TaskSerializer(tasks, many=True).data
        df = pd.DataFrame(data)

        response = HttpResponse(content_type='application/vnd.ms-excel')
        response['Content-Disposition'] = 'attachment; filename="tasks.xlsx"'
        df.to_excel(response, index=False)

        return response
