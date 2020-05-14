from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.request import Request
from django.contrib.auth import authenticate
from knox.models import AuthToken


#Usuarios
class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model= User
        fields = ('id', 'username', 'first_name', 'last_name', 'email','is_staff','is_active','is_superuser')

#Registro de usuarios
class RegisterSerializer(serializers.Serializer): 
    id              = serializers.ReadOnlyField()
    first_name      = serializers.CharField()
    last_name       = serializers.CharField()
    username        = serializers.CharField()
    email           = serializers.EmailField()
    password        = serializers.CharField() 
    is_staff        = serializers.BooleanField()
    is_active       = serializers.BooleanField()
    is_superuser    = serializers.BooleanField()
    
    def create (self, validate_data): 
        instance = User()
        instance.first_name     = validate_data.get("first_name")
        instance.last_name      = validate_data.get("last_name")
        instance.username       = validate_data.get("username")
        instance.email          = validate_data.get("email")
        instance.is_staff       = False
        instance.is_active      = True
        instance.is_superuser   = False
        instance.set_password(validate_data.get("password"))    
        instance.save()
        
        return instance


    def validate_username(self, data):
        print(data)
        users = User.objects.filter(username = data)
        if len (users) != 0:
            raise serializers.ValidationError("Usuario ya existente")
        else: 
            return data 
        
#Login user         
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password= serializers.CharField()
    
    def validate(self, data): 
        user = authenticate(**data)
        if user is not None:
            if user.is_active:
                return user
            else:
                raise serializers.ValidationError("Usuario inactivo")
        raise serializers.ValidationError("Datos incorrectos")

class UpdateUserSerializer(serializers.Serializer):
    id              = serializers.ReadOnlyField()
    first_name      = serializers.CharField()
    last_name       = serializers.CharField()
    username        = serializers.CharField()
    email           = serializers.EmailField()
    is_staff        = serializers.BooleanField()
    is_active       = serializers.BooleanField()
    is_superuser    = serializers.BooleanField()

    def update(self, instance, validated_data):
        """ Actualizacion de user"""
        instance.first_name     = validated_data.get('first_name', instance.first_name)
        instance.last_name      = validated_data.get('last_name', instance.last_name)
        instance.username       = validated_data.get('username', instance.username)
        instance.email          = validated_data.get('email', instance.email)
        instance.is_staff       = validated_data.get('is_staff', instance.is_staff)
        instance.is_active      = validated_data.get('is_active', instance.is_active)
        instance.is_superuser   = validated_data.get('is_superuser', instance.is_superuser)
        instance.save(update_fields=['username', 'first_name', 'last_name', 'email','is_staff','is_active','is_superuser'])
        return instance                         
