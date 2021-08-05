import urllib.request
import urllib.parse
from urllib.error import HTTPError

import json
import requests
from django.core.files import File
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from kafka import KafkaProducer
from elasticsearch import Elasticsearch

@method_decorator(csrf_exempt, name='dispatch')
class HomePageExperience(View):
    def get(self, request):
        # Then need to get the json with all of the reviews and return the top 3
        # Need to check the json is found
        link = 'http://models:8000/api/v1/services/review/getAll/'
        req = urllib.request.Request(link)
        resp_json = urllib.request.urlopen(req).read().decode('utf-8')
        reviews = json.loads(resp_json)
        if(reviews['found'] == True):
            reviews = reviews['result']
            reviews.sort(key=lambda r: r['rating'], reverse=True)
            if(len(reviews) > 3):
                reviews = reviews[0:3]
            for review in reviews:
                del review["user_id"]
                del review["created_by_id"]
                del review["id"]
        else:
            return JsonResponse({'found': False, 'result': "Error, Top Reviews not found."})

        return JsonResponse({'found': True,  'Top Reviews': reviews},  safe=False)


@method_decorator(csrf_exempt, name='dispatch')
class DetailExperience(View):
    # First get the json with all of the users/businesses and return the top 3
    # Need to check it is found
    def get(self, request):
        link = 'http://models:8000/api/v1/users/user/getAll/'
        req = urllib.request.Request(link)
        resp_json = urllib.request.urlopen(req).read().decode('utf-8')
        users = json.loads(resp_json)
        if(users['found'] == True):
            users = users['result']
            users.sort(key=lambda r: r['rating'], reverse=True)
            if(len(users) > 3):
                users = users[0:3]
            for user in users:
                del user["phone_number"]
                del user["password"]
                del user["address"]
                del user["id"]

        else:
            return JsonResponse({'found': False, 'result': "Error, Featured Businesses not found."})

        return JsonResponse({'found': True, 'Top Businesses': users},  safe=False)


@method_decorator(csrf_exempt, name='dispatch')
class ProfileExperience(View):
    def get(self,request, username):
        #Get user info
        link='http://models:8000/api/v1/users/user/byname/' + str(username)
        req = urllib.request.Request(link)
        resp_json = urllib.request.urlopen(req).read().decode('utf-8')
        response = json.loads(resp_json)
        if(response['found'] == False):
            return JsonResponse({'found': False, 'result': 'Error, user not found.'})
        user_id = response['result']
        link='http://models:8000/api/v1/users/user/' + str(user_id) + '/'
        req = urllib.request.Request(link)
        resp_json = urllib.request.urlopen(req).read().decode('utf-8')
        user = json.loads(resp_json)
        if (user['found'] == False):
            return JsonResponse({'found': False, 'result': 'Error, user not found.'})
        del user['result']['id']
        del user['result']['password']
        del user['result']['image_id']
        if(user['result']['phone_number'] == 0):
            user['result']['phone_number'] = ""
        #Get user reviews
        link='http://models:8000/api/v1/services/review/getUserReview/' + str(user_id) + '/'
        req = urllib.request.Request(link)
        resp_json = urllib.request.urlopen(req).read().decode('utf-8')
        reviews = json.loads(resp_json)
        rating = 0
        if (reviews['found'] == False):
            reviews_found = []
            num_reviews = 0
        else:
            num_reviews = len(reviews['result'])
            for review in reviews['result']:
                    del review["user_id"]
                    del review["id"]
                    created_by = requests.get('http://models:8000/api/v1/users/user/' + str(review["created_by_id"])).json()['result']
                    review['created_by_username'] = created_by['username']
                    del review["created_by_id"]
                    rating += review['rating']
            reviews_found = reviews['result']
        if(rating > 0):
            user['result']['rating'] = rating / num_reviews
        else:
            user['result']['rating'] = ""
        #Get user listings
        link='http://models:8000/api/v1/services/listing/get/' + str(user_id)
        req = urllib.request.Request(link)
        resp_json = urllib.request.urlopen(req).read().decode('utf-8')
        response = json.loads(resp_json)
        if(response['found'] == True):
            for  listing in response['result']:
                del listing["created_by_id"]
                link = 'http://models:8000/api/v1/services/image/get/'+str(listing['images_id'])
                image_link = urllib.request.Request(link)
                resp_json = urllib.request.urlopen(image_link).read().decode('utf-8')
                image = json.loads(resp_json)
                if(image['found']==True):
                    image_link = image['result']
                else:
                    image_link = "404"
                listing['image'] = str(image_link)
                del listing["images_id"]
        return JsonResponse({'found' : True, 'user' : user['result'], 'reviews': reviews_found, 'num_reviews' : num_reviews,'listings' : response['result']})


@method_decorator(csrf_exempt, name='dispatch')
class UpdateInfoExperience(View):
    def post(self,request):
        #First make sure they are authenticated
        if 'cookie' not in request.POST:
            return JsonResponse({'authenticated': False, 'error': 'cookie required'})
        link='http://models:8000/api/v1/users/user/authenticate/' + str(request.POST['cookie'])
        req = urllib.request.Request(link)
        resp_json = urllib.request.urlopen(req).read().decode('utf-8')
        response = json.loads(resp_json)
        if response['found'] == True:
            if('phone_number' in request.POST):
                phone_number = request.POST['phone_number']
            else:
                phone_number = ""
            if('address' in request.POST):
                address = request.POST['address']
            else:
                address = ""
            if('name' in request.POST):
                name = request.POST['name']
            else:
                name = ""
            if('description' in request.POST):
                description = request.POST['description']
            else:
                description = ""
            requests.post('http://models:8000/api/v1/users/user/updateInfo/' + str(response['user_id']), data={"phone_number": phone_number, "name": name, "address": address, "description": description})
            return JsonResponse({'authenticated' : True, 'updated': True})
        else:
            return JsonResponse({'authenticated' : False, 'error' : 'User not authenticated'})

