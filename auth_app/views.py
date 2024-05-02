from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import OneTimePassword,User
from .serializers import UserRegisterSerializer,LoginSerializer,PasswordResetRequestSerializer,SetNewPasswordSerializer,LogoutUserSerializer
from .utils import generateOtp, send_code_to_user
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.utils.encoding import smart_str, DjangoUnicodeDecodeError,force_str
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from drf_spectacular.utils import extend_schema




@extend_schema(tags=['Register'])
class RegisterUserView(APIView):
    serializer_class = UserRegisterSerializer

    def post(self, request):
        user_data = request.data
        serializer = self.serializer_class(data=user_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user = serializer.data
            send_code_to_user(user['email'], otp=generateOtp())
            print(user)
            return Response(
                {
                    'data': user,
                    'message': f'hi{user.first_name,user.last_name} Thank you Creating Account!!'
                },
                status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@extend_schema(tags=['Verify E-Mail'])
class VerifyUserEmail(APIView):
    def post(self, request):
        otpcode = request.data.get('otp')
        try:
            user_code_obj = OneTimePassword.objects.get(code=otpcode)
            user = user_code_obj.user
            if not user.is_verified:
                user.is_verified = True
                user.save()
                return Response(
                    {
                        'message': 'Email Verified Successfully!!'
                    },
                    status=status.HTTP_200_OK)
            return Response(
                {'message': 'Code is invalid, Email is already verified!!'}, status=status.HTTP_204_NO_CONTENT)

        except OneTimePassword.DoesNotExist:
            return Response({"message": "OTP not provided"}, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(tags=['Login'])

class LoginUserView(APIView):
    serializer_class = LoginSerializer
    def post(self, request):
        serializer=self.serializer_class(data=request.data,context={'request':request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

@extend_schema(tags=['Test Authentication'])

class TestAuthenticationView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        data={
            'message':'You are Authenticated'
        }
        return Response(data,status=status.HTTP_200_OK)

@extend_schema(tags=['Rest PassWord'])

class PasswordResetRequest(APIView):
    serializer_class=PasswordResetRequestSerializer
    def post(self,request):
        serializer=self.serializer_class(data=request.data,context={'request':request})
        serializer.is_valid(raise_exception=True)
        return Response({"message":"a link has been sent to your email to reset your password"},status=status.HTTP_200_OK)

@extend_schema(tags=['Password Reset Confirm'])

class PasswordResetConfirm(APIView):
    def get(self,request,uidb64,token):
        try:
            # user_id=smart_str(urlsafe_base64_encode(uidb64))
            user_id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=user_id)
            user=User.objects.get(id=user_id)
            if not PasswordResetTokenGenerator().check_token(user,token):
                return Response({"message":"Token is invalid or has expired"},status=status.HTTP_401_UNAUTHORIZED)
            return Response({'success':True, 'message':'credentials is valid','uidb64':uidb64,'token':token},status=status.HTTP_200_OK)
        
        except DjangoUnicodeDecodeError:
            return Response({"message":"Token is invalid or has expired"},status=status.HTTP_401_UNAUTHORIZED)


@extend_schema(tags=['Set New PassWord'])

class SetNewPassword(APIView):
    serializer_class=SetNewPasswordSerializer
    def patch(self,request):
        serializer=self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({"message":"Password reset success"},status=status.HTTP_200_OK)

@extend_schema(tags=['Logout'])
class LogoutUser(APIView):
    serializer_class=LogoutUserSerializer
    permission_classes=[IsAuthenticated]

    def post(self,request):
        serializer=self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)