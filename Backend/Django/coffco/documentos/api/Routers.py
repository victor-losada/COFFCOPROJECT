from django.urls import path,include
from documentos.api.Views import productosViewSet
from rest_framework import routers
router = routers.DefaultRouter()
router.register(prefix='documentos',basename='documentos',viewset=productosViewSet)