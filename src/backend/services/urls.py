from django.urls import path

from .views import ReviewInfo, NewReview, DeleteReview, ReviewGetAll,GetUserReview, NewListing, GetAllListing, GetImage, GetListing, NewListingImage,ViewListing, DeleteListing, NewRecommendation, GetRecommendation, DeleteRecommendation, DeleteAllRecommendation
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
        path('review/<int:review_id>/', ReviewInfo.as_view(), name='retrieve'),
        path('review/update/<int:review_id>/', ReviewInfo.as_view(), name='update'),
        path('review/new/', NewReview.as_view(), name='create'),
        path('review/getAll/', ReviewGetAll.as_view(), name='get_all_reviews'),
        path('review/getUserReview/<int:user_id>/', GetUserReview.as_view(), name='user'),
        path('review/delete/<int:review_id>/', DeleteReview.as_view(), name='delete'),
        path('listing/new/', NewListing.as_view(),name='new_listing'),
        path('listing/delete/', DeleteListing.as_view(),name='remove_listing'),
        path('listing/getAll/',GetAllListing.as_view(),name='get_all_listings'),
        path('listing/get/<int:user>',GetListing.as_view(),name='get_listings'),
        path('listing/listing/<int:listing_id>', ViewListing.as_view(),name='view_listing'),
        path('image/get/<int:image_id>', GetImage.as_view(),name='get_image'),
        path('image/new/', NewListingImage.as_view(), name='new_image'),
        path('recommendation/new/', NewRecommendation.as_view(), name='new_recommendation'),
        path('recommendation/get/<int:item_id>', GetRecommendation.as_view(), name='get_recommendation'),
        path('recommendation/delete/', DeleteRecommendation.as_view(), name='delete_recommendation'),
        path('recommendation/deleteAll/', DeleteAllRecommendation.as_view(), name='delete_all_recommendation')

]
