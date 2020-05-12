
from rest_framework import status, generics, mixins
from rest_framework.response import Response
from rest_framework.decorators import api_view
from knox.models import AuthToken
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from .serializer import RegisterSerializer, UserSerializer, LoginSerializer

#Listar usuarios
class ListUsers(generics.ListAPIView): 
    queryset = User.objects.all()
    serializer_class = UserSerializer  

class ListUser(generics.ListAPIView):
    serializer_class = UserSerializer
    def get_queryset(self):
        pk=self.kwargs['pk']
        if User.objects.filter(pk=pk).exists():
            return User.objects.filter(pk=pk)
#Registrar usuarios
class RegisterUser(generics.GenericAPIView): 
    
    def post(self, request): 
        serializer = RegisterSerializer(data=request.data)
        
        if serializer.is_valid(): 
            user= serializer.save() 
            token= AuthToken.objects.create(user)
            
            print(token[1])
            return Response({"user": UserSerializer(user).data}, status= status.HTTP_201_CREATED )
        else: 
            return Response("Este usuario ya existe en We Drive",status= status.HTTP_400_BAD_REQUEST)
        
#Login usuarios        
class LoginUser(generics.GenericAPIView):
     serializer_class = LoginSerializer
     
     def post (self, request, *args, **kwargs):
        serializer= self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token= AuthToken.objects.create(user)
        return Response({
             "user": UserSerializer(user).data, 
             "token": token[1]
            }, status= status.HTTP_201_CREATED)

class UpdateUser(generics.RetrieveAPIView,mixins.DestroyModelMixin,mixins.UpdateModelMixin):
    serializer_class = RegisterSerializer

    def get_object(self):
        pk = self.kwargs["pk"]
        obj = get_object_or_404(User, pk=pk)
        return obj

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
