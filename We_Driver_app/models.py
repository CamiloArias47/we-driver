from django.db import models

# Create your models here.
class camara(models.Model):
    id = models.AutoField(primary_key=True)
    lat = models.FloatField(max_length=100,blank=True)
    lng = models.FloatField(max_length=100,blank=True)
    velocidad_maxima = models.IntegerField(default=0,blank=True, null=True)
    fecha_registro = models.DateField(auto_now=True)
    picture = models.ImageField(upload_to='pictures',max_length=255,blank=True, null=True)
    comentario = models.CharField(max_length=200)
    item_aprobado = models.BooleanField(null=False,blank=False)

class estacion(models.Model):
    id = models.AutoField(primary_key=True)
    lat = models.FloatField(max_length=100,blank=True)
    lng = models.FloatField(max_length=100,blank=True)
    fecha_registro = models.DateField(auto_now=True)
    precio_galon_corriente = models.IntegerField(default=0,blank=True, null=True)
    precio_galon_extra = models.IntegerField(default=0,blank=True, null=True)
    precio_galon_acpm = models.IntegerField(default=0,blank=True, null=True)
    precio_metro_cubico_gas = models.IntegerField(default=0,blank=True, null=True)
    picture = models.ImageField(upload_to='pictures',max_length=255,blank=True, null=True)
    comentario = models.CharField(max_length=200)
    item_aprobado = models.BooleanField(null=False,blank=False)

