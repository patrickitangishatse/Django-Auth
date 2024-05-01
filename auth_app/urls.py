from django.urls import path
from .views import RegisterUserView,VerifyUserEmail,LoginUserView,TestAuthenticationView,PasswordResetRequest,PasswordResetConfirm,SetNewPasswordSerializer


urlpatterns = [
    path('register/',RegisterUserView.as_view(),name='register'),
    path('verify-email/',VerifyUserEmail.as_view(),name='verify'),
    path('login/',LoginUserView.as_view(),name='login'),
    path('profile/',TestAuthenticationView.as_view(),name='granted'),
    path('password-reset/',PasswordResetRequest.as_view(),name='password-reset'),
    path('password-reset-confirm/<uidb64>/<token>/',PasswordResetConfirm.as_view(),name='password-reset-confirm'),
    path('set-new-password/',SetNewPasswordSerializer.as_view(),name='password-reset-complete')
]