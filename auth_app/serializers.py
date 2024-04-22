from rest_framework import serializers
from .models import User



class UserRegisterSerializer(serializers.ModelSerializer):
    password=serializers.CharField(max_length=60, min_length=10, write_only=True)
    password2=serializers.CharField(max_length=60, min_length=10, write_only=True)

    class Meta:
        model=User
        fields=['email','first_name','last_name','password','password2']
    

    def validate(self,attrs):
        password=attrs.get('password')
        password2=attrs.get('password2')
        
        if password and password2:
            if password!=password2:
                raise serializers.ValidationError('The Passwords Does not Match')
            return attrs    

    def create(self,validated_data):
        user=User.objects.create_user(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password']
        )
        return user