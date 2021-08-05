from django.urls import path

from .views import UserNew, UserInfo, UserDelete, UserInfoAll, UserLogin, UserLogout, UserAuthenticate, GetUserByUsername, UpdateUserInfo, UploadAvatar
from . import views

urlpatterns = [
    path('user/new/', UserNew.as_view(), name='add_user'),
    path('user/<int:user_id>/',
         UserInfo.as_view(), name='get_user'),
    path('user/update/<int:user_id>/',
         UserInfo.as_view(), name='update_user'),
    path('user/delete/<int:user_id>/', UserDelete.as_view(), name='delete_user'),
    path('user/getAll/',UserInfoAll.as_view(),name='get_all_useres'),
    path('user/login/',UserLogin.as_view(),name='login'),
    path('user/logout/<str:token>',UserLogout.as_view(),name='logout'),
    path('user/authenticate/<str:token>',UserAuthenticate.as_view(),name='logout'),
    path('user/byname/<username>', GetUserByUsername.as_view(), name='get_user_by_username'),
    path('user/updateInfo/<int:user_id>', UpdateUserInfo.as_view(), name='update_user_info'),
    path('user/avatar/', UploadAvatar.as_view(), name='upload_avatar')
    ]
