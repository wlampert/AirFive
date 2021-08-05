from django.urls import path
from .views import HomePageExperience, DetailExperience, ProfileExperience, UpdateInfoExperience
from .views_utility import Authenticate, UploadImageExperience
from .views_listings import CreateListingExperience , ListingView, DeleteListingExperience, RecommendedListingView, CreateReviewExperience
from .views_search import SearchExperience,HotListing
from .views_account import LoginExperience,LogoutExperience,CreateBusinessAccountExperience, UploadAvatarExperience, GetAvatarExperience

from . import views

urlpatterns = [
        path('home/',HomePageExperience.as_view(),name='home_page'),
        #for next project
        #path('detail/<int:business_id>/', DetailExperience.as_view(), name='detail_page')
        path('detail/', DetailExperience.as_view(), name='detail_page'),
        path('login/', LoginExperience.as_view(), name='login_page'),
        path('logout/', LogoutExperience.as_view(), name='logout_page'),
        path('createAccount/', CreateBusinessAccountExperience.as_view(), name='new_account_page'),
        path('createListing/', CreateListingExperience.as_view(), name = 'create_listing_page'),
        path('createReview/', CreateReviewExperience.as_view(), name = 'create_review'),
        path('deleteListing/', DeleteListingExperience.as_view(), name = 'delete_listing'),
        path('uploadImage/', UploadImageExperience.as_view(), name = 'upload_image'),
        path('listing/<int:request_id>', ListingView.as_view(), name = 'listing_view'),
        path('search/',SearchExperience.as_view(),name='search'),
        path('authenticate/', Authenticate.as_view(), name='authenticate'),
        path('hot/',HotListing.as_view(),name='hot_listings'),
        path('listing/recommendation/<int:request_id>', RecommendedListingView.as_view(), name='recommended_listings'),
        path('profile/<username>', ProfileExperience.as_view(), name = 'profile_page'),
        path('profile/update/', UpdateInfoExperience.as_view(), name = 'update_info'),
        path('profile/avatar/upload/', UploadAvatarExperience.as_view(), name= 'upload_avatar'),
        path('profile/avatar/<username>', GetAvatarExperience.as_view(), name= 'get_avatar'),
]
