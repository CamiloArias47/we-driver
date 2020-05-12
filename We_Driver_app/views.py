from rest_framework import viewsets
from .models import camara,estacion
from .serializer import camaraSerializer,estacionSerializer


class camaraViewset(viewsets.ModelViewSet):
    queryset = camara.objects.all()
    serializer_class = camaraSerializer
    


class estacionViewset(viewsets.ModelViewSet):
    queryset = estacion.objects.all()
    serializer_class = estacionSerializer
    
