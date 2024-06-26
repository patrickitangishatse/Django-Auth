from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import smart_str,smart_bytes,force_str
from django.urls import reverse
from .utils import send_normal_email
from rest_framework_simplejwt.tokens import RefreshToken,Token




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


class LoginSerializer(serializers.ModelSerializer):
    email=serializers.EmailField(max_length=255, min_length=6)
    password=serializers.CharField(max_length=60,  write_only=True)
    full_name=serializers.CharField(max_length=255, read_only=True)
    access_token=serializers.CharField(max_length=255, read_only=True)
    refresh_token=serializers.CharField(max_length=255, read_only=True)
    class Meta:
        model=User
        fields=['email','password','full_name','access_token','refresh_token']

    
    def validate(self,attrs):
        email=attrs.get('email')
        password=attrs.get('password')
        request=self.context.get('request') 
        user=authenticate(email=email,password=password)
        if not user:
            raise AuthenticationFailed('Invalid Credentials, Please try again')
        user_token=user.tokens()

        return {
            'email':user.email,
            'full_name':user.full_name,
            'access_token':str(user_token.get('access')),
            'refresh_token':str(user_token.get('refresh'))
        }

class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255, min_length=6)

    def validate(self, attrs):
        email = attrs.get('email')
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("User with this email does not exist.")

        uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
        token = PasswordResetTokenGenerator().make_token(user)
        request = self.context.get('request')
        site_domain = get_current_site(request).domain
        relative_link = reverse('password-reset-confirm', kwargs={'uidb64': uidb64, 'token': token})
        absurl = f'http://{site_domain}{relative_link}'
        email_body = f"Hi, please use the link below to reset your password:\n{absurl}"
        data = {
            'email_body': email_body,
            'to_email': user.email,
            'email_subject': 'Reset your password'
        }
        send_normal_email(data)
        return attrs

class SetNewPasswordSerializer(serializers.Serializer):
    password=serializers.CharField(max_length=60, min_length=6, write_only=True)
    confirm_password=serializers.CharField(max_length=60, min_length=6, write_only=True)
    uidb64=serializers.CharField(max_length=255, write_only=True)
    token=serializers.CharField(max_length=255, write_only=True)

    class Meta:
        fields=['password','confirm_password','uidb64','token']
    
    def validate(self,attrs):
        try:
            token=attrs.get('token')
            uidb64=attrs.get('uidb64')
            password=attrs.get('password')
            confirm_password=attrs.get('confirm_password')

            user_id=force_str(urlsafe_base64_decode(uidb64))
            user=User.objects.get(id=user_id)
            if not PasswordResetTokenGenerator().check_token(user,token):
                raise AuthenticationFailed('The reset link is invalid or has expired',401)
            if password!=confirm_password:
                raise AuthenticationFailed('The Passwords do not match',401)
            user.set_password(password)
            user.save()
            return user
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid or has expired',401)

class LogoutUserSerializer(serializers.Serializer):
    refresh=serializers.CharField()

    default_error_messages={'bad_token':('Token is invalid or expired')}


    def validate(self, attrs):
        self.token=attrs['refresh_token']
        return attrs
    
    def save(self, **kwargs):
        try:
            token=RefreshToken(self.token)
            token.blacklist()
        except Exception:
            return self.fail('Token is invalid or expired')
        