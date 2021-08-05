from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from .models import Review, Listing, ListingImage, Recommendation
from users.models import User
from .forms import ReviewForm
from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

# remove later not safe
# For getting and updating Reviews
@method_decorator(csrf_exempt, name='dispatch')
class ReviewInfo(View):
    def get(self, request, review_id):
        review = Review.objects.all().filter(id=review_id).values()
        if len(review) == 0:
            return JsonResponse({'found': False})
        return JsonResponse({'found': True, 'result': review[0]})

    def post(self, request, review_id):
        try:
            review = Review.objects.get(id=review_id)
        except:
            return JsonResponse({'found': False})

        updated_form = ReviewForm(request.POST, instance=review)
        if updated_form.is_valid():
            updated_material = updated_form.save()
            review = Review.objects.all().filter(id=review_id).values()
            return JsonResponse({'found': True, 'updated': review[0]})
        return JsonResponse({'found': False, 'error': updated_form.errors})


# For creating new Reviews
@method_decorator(csrf_exempt, name='dispatch')
class NewReview(View):
    def post(self, request):
        new_form = ReviewForm(request.POST)
        if new_form.is_valid():
            review = new_form.save()
            review_values = Review.objects.all().filter(id=review.id).values()
            return JsonResponse({'created': True, 'review': review_values[0]})
        return JsonResponse({'created': False, 'errors': new_form.errors})


# For deleting Reviews
@method_decorator(csrf_exempt, name='dispatch')
class DeleteReview(View):
    def post(self, request, review_id):
        try:
            review = Review.objects.get(id=review_id)
        except:
            return JsonResponse({'found': False})
        review.delete()
        return JsonResponse({'found': True, 'deleted': True})


@method_decorator(csrf_exempt, name='dispatch')
class ReviewGetAll(View):
    def get(self, request):
        reviews = Review.objects.all().values()
        if len(reviews) == 0:
            return JsonResponse({'found': False})
        return JsonResponse({'found': True, 'result': list(reviews)})


@method_decorator(csrf_exempt, name='dispatch')
class GetUserReview(View):
    def get(self, request, user_id):
        # get all then from all reviews pick out specified user
        reviews = Review.objects.all().values()
        if len(reviews) == 0:
            return JsonResponse({'found': False})
        user = []
        for i in reviews:
            if(user_id == i["user_id"]):
                user.append(i)
        return JsonResponse({'found': True, 'result': user})


@method_decorator(csrf_exempt, name='dispatch')
class NewListingImage(View):
    def post(self, request):
        try:
            new_image = ListingImage.objects.create(
                image=request.FILES['image'])
            return JsonResponse({'created': True, 'image_id': new_image.id})
        except Exception as e:
            return JsonResponse({'created': False, 'error': str(e)})


@method_decorator(csrf_exempt, name='dispatch')
class NewListing(View):
    def post(self, request):
        image = ListingImage.objects.filter(id=request.POST['image_id'])[0]
        #image.description = request.POST['description']
        new_listing = Listing.objects.create(type=request.POST['type'], images=image, created_by_id=request.POST['user_id'], price=request.POST['price'], title=request.POST['title'], short_description=request.POST[
                                             'short_description'], long_description=request.POST['long_description'], duration=request.POST['duration'], group_size=request.POST['group_size'], date=request.POST['date'])
        return JsonResponse({'created': True, 'listing': Listing.objects.filter(id=new_listing.id).values()[0]})


@method_decorator(csrf_exempt, name='dispatch')
class GetAllListing(View):
    def get(self, request):
        listings = Listing.objects.all().values()
        if len(listings) == 0:
            return JsonResponse({'found': False})
        return JsonResponse({'found': True, 'result': list(listings)})


@method_decorator(csrf_exempt, name='dispatch')
class GetListing(View):
    def get(self, request, user):
        listings = Listing.objects.all().values()
        listing = []
        for i in listings:
            if i["created_by_id"] == user:
                listing.append(i)
        if len(listing) == 0:
            return JsonResponse({'found': False, 'result': listing})
        return JsonResponse({'found': True, 'result': listing})

# For deleting Reviews
@method_decorator(csrf_exempt, name='dispatch')
class DeleteListing(View):
    def post(self, request):
        listing_id = request.POST['listing_id']
        try:
            listing = Listing.objects.get(id=listing_id)
        except:
            return JsonResponse({'found': False})
        listing.delete()
        return JsonResponse({'found': True, 'id':listing_id,'deleted': True})


@method_decorator(csrf_exempt, name='dispatch')
class ViewListing(View):
    def get(self, request, listing_id):
        listings = Listing.objects.all().values()
        listing = []
        for i in listings:
            if i["id"] == listing_id:
                listing.append(i)
        users = User.objects.all().values()
        for i in users:
            if i["id"] == listing[0]["created_by_id"]:
                listing[0]["username"] = i["username"]
        return JsonResponse({'found': True, 'result': listing})


@method_decorator(csrf_exempt, name='dispatch')
class GetImage(View):
    def get(self, request, image_id):
        images = ListingImage.objects.filter(id=image_id).values()
        if len(images) == 0:
            return JsonResponse({'found': False})
        link = "https://airfive-bucket.s3.us-east-2.amazonaws.com" + \
            images[0]["image"]
        return JsonResponse({'found': True, 'result': link})


@method_decorator(csrf_exempt, name='dispatch')
class NewRecommendation(View):
    def post(self, request):
        recommendation = Recommendation.objects.filter(
            item_id=request.POST["item_id"])
        if(len(recommendation) == 0):
            new_recommendation = Recommendation.objects.create(
                item_id=request.POST["item_id"], recommended_items=str(request.POST["recommended_items"]))
            return JsonResponse({'status': 'Created', 'recommended items': new_recommendation.recommended_items})
        else:
            recommendation[0].recommended_items += "," + \
                str(request.POST["recommended_items"])
            recommendation[0].save()
            return JsonResponse({'status': 'Updated', 'recommended items': recommendation[0].recommended_items})


@method_decorator(csrf_exempt, name='dispatch')
class GetRecommendation(View):
    def get(self, request, item_id):
        recommendation = Recommendation.objects.filter(item_id=item_id)
        if (len(recommendation) == 0):
            return JsonResponse({'found': False})
        else:
            return JsonResponse({'found': True, 'recommended items': recommendation[0].recommended_items})


@method_decorator(csrf_exempt, name='dispatch')
class DeleteRecommendation(View):
    def post(self, request):
        try:
            recommendation = Recommendation.objects.get(
                id=request.POST['item_id'])
        except:
            return JsonResponse({'found': False})
        recommendation.delete()
        return JsonResponse({'found': True, 'deleted': True})


@method_decorator(csrf_exempt, name='dispatch')
class DeleteAllRecommendation(View):
    def get(self, request):
        try:
            Recommendation.objects.all().delete()
        except:
            return JsonResponse({'found': False})
        return JsonResponse({'found': True, 'deleted': True})
