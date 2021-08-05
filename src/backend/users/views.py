from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from .models import User, Auth
from .forms import UserForm
from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator



@method_decorator(csrf_exempt, name='dispatch')
class UserNew(View):
    def post(self, request):
        form = UserForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'created': True, 'results': form.cleaned_data})
        return JsonResponse({'created' : False, 'error' : form.errors})


@method_decorator(csrf_exempt, name='dispatch')
class UserInfo(View):
    def get(self, request, user_id):
        user = User.objects.all().filter(id=user_id).values()
        if len(user) != 0:
            return JsonResponse({'found': True, 'result': user[0]})
        return JsonResponse({'found': False})

    def post(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except:
            return JsonResponse({'found': False})
        updated_form = UserForm(request.POST, instance=user)
        if updated_form.is_valid():
            updated_form.save()
            return JsonResponse({'updated': True, 'results': updated_form.cleaned_data})
        return JsonResponse(updated_form.errors)


@method_decorator(csrf_exempt, name='dispatch')
class UserDelete(View):
    def post(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except:
            return JsonResponse({'found': False})
        user.delete()
        return JsonResponse({'found': True, 'deleted': True})

@method_decorator(csrf_exempt, name='dispatch')
class UserInfoAll(View):
    def get(self, request):
        user = User.objects.all().values()
        if len(user) != 0:
            return JsonResponse({'found': True, 'result': list(user)})
        return JsonResponse({'found': False})


@method_decorator(csrf_exempt, name='dispatch')
class UserLogin(View):
    def post(self,request):
        try:
            email = request.POST['email']
            password = request.POST['password']

            user = User.objects.get(email=email)
            authorizer = user.login(password)

            return JsonResponse({'token':authorizer.auth_val, 'username': user.username})
        except User.DoesNotExist:
            return JsonResponse({'found':False})

        except Exception as e:
            return JsonResponse({'Status': repr(e)})

        return JsonResponse({'Status':"Error"})

@method_decorator(csrf_exempt, name='dispatch')
class UserLogout(View):
    def get(self,request,token):
        try:
            Auth.objects.get(auth_val=token).delete()
            return JsonResponse({'Status': 'Deleted token'})
        except:
            return JsonResponse({'Status': 'Error or not logged in'})


@method_decorator(csrf_exempt, name='dispatch')
class UserAuthenticate(View):
    def get(self, request, token):
        try:
            token = Auth.objects.get(auth_val=token)
            return JsonResponse({'found': True, 'user_id' : token.user.id, 'username' : token.user.username})
        except:
            return JsonResponse({'found' : False})

@method_decorator(csrf_exempt, name='dispatch')
class GetUserByUsername(View):
    def get(self, request, username):
        user = User.objects.all().filter(username=username).values()
        if len(user) != 0:
            return JsonResponse({'found': True, 'result': user[0]['id']})
        return JsonResponse({'found': False})

@method_decorator(csrf_exempt, name='dispatch')
class UpdateUserInfo(View):
    def post(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except:
            return JsonResponse({'found': False})
        if(request.POST['phone_number'] != ""):
            user.phone_number = request.POST['phone_number']
        if(request.POST['name'] != ""):
            user.name = request.POST['name']
        if(request.POST['address'] != ""):
            user.address = request.POST['address']
        if(request.POST['description'] != ""):
            user.description = request.POST['description']
        user.save()
        return JsonResponse({'found': True, 'updated': True})

@method_decorator(csrf_exempt, name='dispatch')
class UploadAvatar(View):
    def post(self, request):
        try:
            user = User.objects.get(id=request.POST['user_id'])
        except:
            return JsonResponse({'found': False})
        user.image_id = request.POST['image_id']
        user.save()
        return JsonResponse({'found' : True, 'uploaded' : True})
