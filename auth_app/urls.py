from django.urls import path
from .views import RegisterUserView,VerifyUserEmail,LoginUserView,TestAuthenticationView,PasswordResetRequest,PasswordResetConfirm,SetNewPassword,LogoutUser
from drf_spectacular.views import SpectacularAPIView,SpectacularSwaggerView


urlpatterns = [
    path('schema/',SpectacularAPIView.as_view(),name='schema'),
    path('swagger/',SpectacularSwaggerView.as_view(url_name='schema'),name='swagger-ui'),
    path('register/',RegisterUserView.as_view(),name='register'),
    path('verify-email/',VerifyUserEmail.as_view(),name='verify'),
    path('login/',LoginUserView.as_view(),name='login'),
    path('profile/',TestAuthenticationView.as_view(),name='granted'),
    path('password-reset/',PasswordResetRequest.as_view(),name='password-reset'),
    path('password-reset-confirm/<uidb64>/<token>/',PasswordResetConfirm.as_view(),name='password-reset-confirm'),
    path('set-new-password/',SetNewPassword.as_view(),name='password-reset-complete'),
    path('logout/',LogoutUser.as_view(),name='logout')
]