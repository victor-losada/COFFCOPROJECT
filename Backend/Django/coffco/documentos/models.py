
from django.db import models


class Documento(models.Model):
    nombre = models.CharField(max_length=100)
    fecha_carga = models.DateField(null=True)
    descripcion = models.TextField(blank=True, null=True)
    ESTADO_CHOICES = [
        ('activo', 'Activo'),
        ('inactivo', 'Inactivo'),
    ]

    estado = models.CharField(max_length=10, choices=ESTADO_CHOICES, default='activo')
    

    def __str__(self):
        return self.nombre