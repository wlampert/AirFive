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

@method_decorator(csrf_exempt, name='dispatch')
class LoginExperience(View):
    def post(self, request):
        fields = ['email', 'password']
        for field in fields:
            if field not in request.POST:
                return JsonResponse({'result': 'Login unsuccesfull', 'error': field + ' required'})

        post_data = {'email': request.POST['email'],
                     'password': request.POST['password']}
        link = 'http://models:8000/api/v1/users/user/login/'
        req = urllib.request.Request(
            link, data=urllib.parse.urlencode(post_data).encode("utf-8"))
        resp_json = urllib.request.urlopen(req).read().decode('utf-8')
        response = json.loads(resp_json)
        if('token' in response):
            return JsonResponse({'result': 'Login succesfull', 'token': response['token'], 'username': response['username']})
        elif('found' in response):
            return JsonResponse({'result': 'Login unsuccesfull', 'error': 'User not found'})
        else:
            return JsonResponse({'result': 'Login unsuccesfull', 'error': 'Incorrect Email/Password '})


@method_decorator(csrf_exempt, name='dispatch')
class LogoutExperience(View):
    def post(self, request):
        if 'cookie' not in request.POST:
            return JsonResponse({'error': 'cookie required'})
        link = 'http://models:8000/api/v1/users/user/logout/' + \
            str(request.POST['cookie'])
        req = urllib.request.Request(link)
        resp_json = urllib.request.urlopen(req).read().decode('utf-8')
        response = json.loads(resp_json)
        return JsonResponse({'result': response['Status']}, safe=False)


@method_decorator(csrf_exempt, name='dispatch')
class CreateBusinessAccountExperience(View):
    def post(self, request):
        fields = ['username', 'email', 'password']
        for field in fields:
            if field not in request.POST:
                return JsonResponse({'created': False, 'error': field + ' required'})

        post_data = {'username': request.POST['username'], 'email': request.POST['email'],
                     'password': request.POST['password'], 'rating': 0, 'phone_number': 0}
        link = 'http://models:8000/api/v1/users/user/new/'
        req = urllib.request.Request(
            link, data=urllib.parse.urlencode(post_data).encode("utf-8"))
        resp_json = urllib.request.urlopen(req).read().decode('utf-8')
        response = json.loads(resp_json)
        if response['created'] == True:
            return JsonResponse({'created': True})
        return JsonResponse(response)

@method_decorator(csrf_exempt, name='dispatch')
class UploadAvatarExperience(View):
    def post(self, request):
        if 'cookie' not in request.POST:
            return JsonResponse({'authenticated': False, 'error': 'cookie required'})
        link = 'http://models:8000/api/v1/users/user/authenticate/' + \
            str(request.POST['cookie'])
        req = urllib.request.Request(link)
        resp_json = urllib.request.urlopen(req).read().decode('utf-8')
        response = json.loads(resp_json)
        # Authenticated branch
        if response['found'] == True:
            if 'image_id' not in request.POST:
                return JsonResponse({'authenticated': True, 'error': 'image_id required'})
            requests.post('http://models:8000/api/v1/users/user/avatar/', data={'image_id' : request.POST['image_id'], 'user_id' : str(response['user_id'])})
            return JsonResponse({'authenticated': True, 'result': 'Success'})
        # Not authenticated branch
        else:
            return JsonResponse({'authenticated': False, 'error': 'User not authenticated'})

@method_decorator(csrf_exempt, name='dispatch')
class GetAvatarExperience(View):
    def get(self, request, username):
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
        link = 'http://models:8000/api/v1/services/image/get/'+ str(user['result']['image_id'])
        image_link = urllib.request.Request(link)
        try:
            resp_json = urllib.request.urlopen(image_link).read().decode('utf-8')
            image = json.loads(resp_json)
            if(image['found']==True):
                image_link = image['result']
            else:
                image_link = "404"
        except:
            image_link = "404"
        return JsonResponse({'image_link' : image_link})





