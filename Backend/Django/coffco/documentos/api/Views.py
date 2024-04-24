
from rest_framework import viewsets
from documentos.models import Documento
from documentos.api.Serializer import documentosSerializer
from documentos.api.permissions import IsAdmin
class productosViewSet(viewsets.ModelViewSet):
    permission_classes=[IsAdmin]
    serializer_class = documentosSerializer
    queryset = Documento.objects.all()