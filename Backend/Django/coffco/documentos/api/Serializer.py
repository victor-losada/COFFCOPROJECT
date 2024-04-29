from rest_framework.serializers import  ModelSerializer
from documentos.models import Documento

class documentosSerializer(ModelSerializer):
    class Meta:
        model = Documento
        fields = ['nombre','fecha_carga', 'descripcion','estado']

