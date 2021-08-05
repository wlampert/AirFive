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
class SearchExperience(View):
    def post(self,request):
        words = request.POST["words"]
        body  = {"query":{
                        "multi_match":{
                            "query":words
                        }
                }
        }
        try:
            es=Elasticsearch(['es'])
            try:
                result = es.search(index="marketplace",body=body,size=10)
            except:  
                return JsonResponse({'found':False,'results':None})
            top_results=[]
            for i in result['hits']['hits']:
                # Not sure if this filtration is the best method or if it's good coding practice. Need to verify and refactor in the future if necessary
                listing_id= i['_id']
                clean_hit = i["_source"]
                clean_hit = dict((key,value) for key, value in clean_hit.items() if key in ('title','description','image_id','user','price','visits'))
                link = 'http://models:8000/api/v1/services/image/get/'+clean_hit['image_id']
                image_link = urllib.request.Request(link)
                resp_json = urllib.request.urlopen(image_link).read().decode('utf-8')
                image = json.loads(resp_json)
                if(image['found']==True):
                    image_link = image['result']
                else:
                    image_link = "404"
                clean_hit['image_link']=str(image_link)
                clean_hit['id']=listing_id
                top_results.append(clean_hit)

            if len(top_results)>0:
                return JsonResponse({'found':True,'results':top_results})
            else:
                return JsonResponse({'found':False,'results':top_results})
        except Exception as e:
            return JsonResponse({'found':False,'error':e})

@method_decorator(csrf_exempt, name='dispatch')
class HotListing(View):
    def get(self,request):
        body  = {"query":{
                        "match_all":{
                            
                        }
                }
        }
        try:
            es=Elasticsearch(['es'])
            try:
                result = es.search(index="marketplace",body=body,size=10)
            except:  
                return JsonResponse({'found':False,'results':None})
            # title , image , price
            top_results=[]
            for i in result['hits']['hits']:
                # Not sure if this filtration is the best method or if it's good coding practice. Need to verify and refactor in the future if necessary
                listing_id= i['_id']
                clean_hit = i["_source"]
                ## Old cold from search API above
                clean_hit = dict((key,value) for key, value in clean_hit.items() if key in ('title','description','image_id','user','price','visits'))
                link = 'http://models:8000/api/v1/services/image/get/'+clean_hit['image_id']
                image_link = urllib.request.Request(link)
                resp_json = urllib.request.urlopen(image_link).read().decode('utf-8')
                image = json.loads(resp_json)
                if(image['found']==True):
                    image_link = image['result']
                else:
                    image_link = "404"
                clean_hit['image_link']=str(image_link)
                clean_hit['id']=listing_id
                ## Clean that code up
                clean_hit = dict((key,value) for key, value in clean_hit.items() if key in ('title','price','description','visits','image_link','id'))
                top_results.append(clean_hit)
            for i in top_results:
                if 'visits' not in i:
                    i['visits']=0
            top_results= sorted(top_results, key=lambda x:x['visits'])[::-1]
            if len(top_results)>0:
                return JsonResponse({'found':True,'results':top_results})
            else:
                return JsonResponse({'found':False,'results':top_results})
        except Exception as e:
            return JsonResponse({'found':False,'error':e})
