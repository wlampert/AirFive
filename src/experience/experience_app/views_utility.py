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
from elasticsearch import Elasticsearch
from kafka import KafkaProducer


@method_decorator(csrf_exempt, name='dispatch')
class Authenticate(View):
    def post(self, request):
        if 'cookie' not in request.POST:
                return JsonResponse({'authenticated': False, 'error': 'cookie required'})
        link = 'http://models:8000/api/v1/users/user/authenticate/' + str(request.POST['cookie'])
        req = urllib.request.Request(link)
        resp_json = urllib.request.urlopen(req).read().decode('utf-8')
        response = json.loads(resp_json)
        if(response['found'] == True):
            return JsonResponse({'authenticated' : True, 'username' : response['username']})
        return JsonResponse({'authenticated' : False, 'error' : 'invalid cookie'})

@method_decorator(csrf_exempt, name='dispatch')
class UploadImageExperience(View):
    def post(self, request):
        if 'image' not in request.FILES:
            return JsonResponse({'created': False, 'error': 'image required'})
        # Create the image object
        link = 'http://models:8000/api/v1/services/image/new/'
        response = requests.post(link, files={'image': request.FILES['image']})
        if response.json()['created'] == True:
            # If it is uploaded succesfully, get the image link and return it
            image_id = response.json()['image_id']
            link = 'http://models:8000/api/v1/services/image/get/' + \
                str(image_id)
            req = urllib.request.Request(link)
            resp_json = urllib.request.urlopen(req).read().decode('utf-8')
            response = json.loads(resp_json)
            if response['found'] == True:
                return JsonResponse({'authenticated': True, 'created': True, 'image_id': image_id, 'link': response['result']})
            else:
                return JsonResponse({'authenticated': True, 'created': False, 'error': 'error getting image link'})
        else:
            return JsonResponse({'authenticated': True, 'created': False, 'error': response.json()['error']})
      

