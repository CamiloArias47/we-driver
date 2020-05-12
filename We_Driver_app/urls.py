from django.conf.urls import include, url
from django.contrib import admin

from rest_framework.routers import DefaultRouter

from .views import  camaraViewset,estacionViewset

router = DefaultRouter()

router.register(r'camara',camaraViewset)
router.register(r'estacion',estacionViewset)

urlpatterns = [
    url(r'^', include(router.urls)),
]
