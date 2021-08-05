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
class CreateListingExperience(View):
    def post(self, request):
        # First check to see if the user is authenticatedd
        if 'cookie' not in request.POST:
            return JsonResponse({'authenticated': False, 'error': 'cookie required'})
        link = 'http://models:8000/api/v1/users/user/authenticate/' + \
            str(request.POST['cookie'])
        req = urllib.request.Request(link)
        resp_json = urllib.request.urlopen(req).read().decode('utf-8')
        response = json.loads(resp_json)
        # Authenticated branch
        if response['found'] == True:
            # Check to see if they past in the required fields
            fields = ['type','title', 'price', 'image_id', 'short_description', 'long_description','duration','group_size']
            for field in fields:
                if field not in request.POST:
                    return JsonResponse({'authenticated': True, 'created': False, 'error': field + ' required'})
            user = response['user_id']
            post_data = {'type': request.POST['type'], 'image_id': request.POST['image_id'], 'short_description': request.POST['short_description'], 'user_id': user, 'title': request.POST['title'], 'price': request.POST['price'], 'long_description': request.POST['long_description'],'date':request.POST['date'], 'duration':request.POST['duration'], 'group_size':request.POST['group_size']}

            link = 'http://models:8000/api/v1/services/listing/new/'
            req = urllib.request.Request(link, data=urllib.parse.urlencode(post_data).encode("utf-8"))
            try:
                resp_json = urllib.request.urlopen(req).read().decode('utf-8')
                response = json.loads(resp_json)
            except Exception as e:
                return JsonResponse({'created': False, 'Status': repr(e)})
            # Prepare producer 
            producer = KafkaProducer(bootstrap_servers='kafka:9092')
            # Get ID of post
            response_id=response['listing']['id']
            # Set up values for kafka & Send for consumer
            kafka_vals={'check':True,'id':response_id,'post':post_data}
            kafka_send = producer.send('listings',json.dumps(kafka_vals).encode('utf-8'))
            print(kafka_send.get())
            return JsonResponse({'authenticated': True, 'created': True})
        # Not authenticated branch
        else:
            return JsonResponse({'authenticated': False, 'error': 'User not authenticated'})


@method_decorator(csrf_exempt, name='dispatch')
class DeleteListingExperience(View):
    def post(self, request):
        link = 'http://models:8000/api/v1/users/user/authenticate/' + \
            str(request.POST['cookie'])
        req = urllib.request.Request(link)
        resp_json = urllib.request.urlopen(req).read().decode('utf-8')
        response = json.loads(resp_json)
        # Authenticated branch
        if response['found'] == True:  
            if 'listing_id' not in request.POST:
                return JsonResponse({'authenticated': True, 'deleted': False, 'error': 'Listing ID Required'})
            user = response['user_id']
            try:
                link = 'http://models:8000/api/v1/services/listing/get/'+str(user)
                req = urllib.request.Request(link)
                resp_json = urllib.request.urlopen(req).read().decode('utf-8')
                response = json.loads(resp_json)
            except Exception as e:
                return JsonResponse({'deleted': False, 'Status': repr(e)})
            
            user_posts = []
            for i in response["result"]:
                user_posts.append(i["id"])
            if int(request.POST['listing_id']) not in user_posts:
                return JsonResponse({'deleted':False,'error': 'Can only delete Listings you create.'})

            link = 'http://models:8000/api/v1/services/listing/delete/'
            req = urllib.request.Request(link, data=urllib.parse.urlencode({'listing_id':request.POST['listing_id']}).encode("utf-8"))
            try:
                resp_json = urllib.request.urlopen(req).read().decode('utf-8')
                response = json.loads(resp_json)
            except Exception as e:
                return JsonResponse({'deleted': False, 'Status': repr(e)}) 
            if response['found']==True:
                return JsonResponse({'deleted': True}) 
            return JsonResponse({'deleted': False}) 

@method_decorator(csrf_exempt, name='dispatch')
class ListingView(View):
    def get(self, request,request_id):
        check_cookie = request.COOKIES
        if 'LoginToken' in check_cookie:
            link = 'http://models:8000/api/v1/users/user/authenticate/' + \
                str(request.COOKIES['LoginToken'])
            req = urllib.request.Request(link)
            resp_json = urllib.request.urlopen(req).read().decode('utf-8')
            response = json.loads(resp_json)
            # If Authenticated branch
            if response['found'] == True:
                #link = 'http://models:8000/api/v1/users/user/getAll/'
                link = 'http://models:8000/api/v1/services/listing/listing/'+str(request_id)
                req = urllib.request.Request(link)
                resp_json = urllib.request.urlopen(req).read().decode('utf-8')
                listing = json.loads(resp_json)
                if(listing['found'] == True):
                    listing = listing['result']
                else:
                    return JsonResponse({'found': False, 'result': "Error, Listing not found."})
                if(len(listing)==0):
                    return JsonResponse({'found': False, 'result': "Error, Listing not found."})
                # Prepare producer 
                producer = KafkaProducer(bootstrap_servers='kafka:9092')
                # Get ID of post
                response_id=request_id
                # Set up values for kafka & Send for consumer
                user = response['user_id']
                kafka_vals={'check':False,'id':response_id,'user':user}
                kafka_send = producer.send('listings',json.dumps(kafka_vals).encode('utf-8'))
                print(kafka_send.get())
                link = 'http://models:8000/api/v1/services/image/get/'+str(listing[0]['images_id'])
                image_link = urllib.request.Request(link)
                resp_json = urllib.request.urlopen(image_link).read().decode('utf-8')
                image = json.loads(resp_json)
                if(image['found']==True):
                    image_link = image['result']
                else:
                    image_link = "404"
                listing[0]['image'] = str(image_link)
                return JsonResponse({'found': True, 'Listing': listing},  safe=False)
            # Non authenticated branch .. dont record in kafka
            else:
                link = 'http://models:8000/api/v1/services/listing/listing/'+str(request_id)
                req = urllib.request.Request(link)
                resp_json = urllib.request.urlopen(req).read().decode('utf-8')
                listing = json.loads(resp_json)
                if(listing['found'] == True):
                    listing = listing['result']
                else:
                    return JsonResponse({'found': False, 'result': "Error, Listing not found."})
                if(len(listing)==0):
                    return JsonResponse({'found': False, 'result': "Error, Listing not found."})
                link = 'http://models:8000/api/v1/services/image/get/'+str(listing[0]['images_id'])
                image_link = urllib.request.Request(link)
                resp_json = urllib.request.urlopen(image_link).read().decode('utf-8')
                image = json.loads(resp_json)
                if(image['found']==True):
                    image_link = image['result']
                else:
                    image_link = "404"
                listing[0]['image'] = str(image_link)
                return JsonResponse({'found': True, 'Listing': listing},  safe=False)
        # No cookie can still view listing. just don't record in kafka
        else:
            link = 'http://models:8000/api/v1/services/listing/listing/'+str(request_id)
            req = urllib.request.Request(link)
            resp_json = urllib.request.urlopen(req).read().decode('utf-8')
            listing = json.loads(resp_json)
            if(listing['found'] == True):
                listing = listing['result']
            else:
                return JsonResponse({'found': False, 'result': "Error, Listing not found."})
            if(len(listing)==0):
                return JsonResponse({'found': False, 'result': "Error, Listing not found."})
            link = 'http://models:8000/api/v1/services/image/get/'+str(listing[0]['images_id'])
            image_link = urllib.request.Request(link)
            resp_json = urllib.request.urlopen(image_link).read().decode('utf-8')
            image = json.loads(resp_json)
            if(image['found']==True):
                image_link = image['result']
            else:
                image_link = "404"
            listing[0]['image'] = str(image_link)
            return JsonResponse({'found': True, 'Listing': listing,'debug':request.COOKIES},  safe=False)

@method_decorator(csrf_exempt, name='dispatch')
class CreateReviewExperience(View):
    def post(self, request):
        # First check to see if the user is authenticatedd
        if 'cookie' not in request.POST:
            return JsonResponse({'authenticated': False, 'error': 'cookie required'})
        link = 'http://models:8000/api/v1/users/user/authenticate/' + \
            str(request.POST['cookie'])
        req = urllib.request.Request(link)
        resp_json = urllib.request.urlopen(req).read().decode('utf-8')
        response = json.loads(resp_json)
        # Authenticated branch
        if response['found'] == True:
            # Check to see if they past in the required fields
            fields = ['date', 'description','rating','profile']
            for field in fields:
                if field not in request.POST:
                    return JsonResponse({'authenticated': True, 'created': False, 'error': field + ' required'})
            user = response['user_id']

            link='http://models:8000/api/v1/users/user/byname/' + str(request.POST['profile'])
            req = urllib.request.Request(link)
            resp_json = urllib.request.urlopen(req).read().decode('utf-8')
            response = json.loads(resp_json)
            if(response['found'] == False):
                return JsonResponse({'authenticated': True, 'created': False, 'result': 'Error, user not found.'})
            user_id = response['result']
            post_data = {'created_by':user, 'date':request.POST['date'],'description':request.POST['description'],'rating':request.POST['rating'],'user': user_id}
            link = 'http://models:8000/api/v1/services/review/new/'
            req = urllib.request.Request(link, data=urllib.parse.urlencode(post_data).encode("utf-8"))
            try:
                resp_json = urllib.request.urlopen(req).read().decode('utf-8')
                response = json.loads(resp_json)
            except Exception as e:
                return JsonResponse({'created': False, 'Status': repr(e)})
            return JsonResponse({'authenticated': True, 'created': True})
        # Not authenticated branch
        else:
            return JsonResponse({'authenticated': False, 'error': 'User not authenticated'})


@method_decorator(csrf_exempt, name='dispatch')
class RecommendedListingView(View):
    def get(self, request, request_id):
        r1 = requests.get("http://models:8000/api/v1/services/recommendation/get/" +str(request_id))
        if(json.loads(r1.text)["found"] == True):
            recommended_items = json.loads(r1.text)["recommended items"]
            results = []
            x = 0
            while x < len(recommended_items):
                y = int(recommended_items[x])
                listing = requests.get('http://models:8000/api/v1/services/listing/listing/'+str(y))  
                if('json' not in listing.headers.get('Content-Type')):
                    x+=2
                else:
                    title = json.loads(listing.text)['result'][0]['title']
                    date = json.loads(listing.text)['result'][0]['date']
                    price = json.loads(listing.text)['result'][0]['price']
                    duration = json.loads(listing.text)['result'][0]['duration']
                    image_id = json.loads(listing.text)['result'][0]['images_id']
                    image = requests.get('http://models:8000/api/v1/services/image/get/'+str(image_id))
                    if(json.loads(image.text)['found']==True):
                        image_link = json.loads(image.text)['result']
                    else:
                        image_link = "404"
                    
                    results.append({"id" : y, "image_link": image_link, "title" : title, "date" : date, "duration" : duration, "price" : price})
                    x += 2
            return JsonResponse({"found" : True, "result" : results})
        else:
            return JsonResponse({"found" : False})


