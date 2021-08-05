from elasticsearch import Elasticsearch
from kafka import KafkaConsumer
import json

es = Elasticsearch(['es'])
consumer = KafkaConsumer('listings',group_id='new_listing', bootstrap_servers=['kafka:9092'])
body = {
        "mappings":{
            "post":{
                "style":{
                    "type":"text"
                },
                "title":{
                    "type":"text"
                },
                
                "description":{
                    "type":"text"
                },
                
                "price":{
                    "type":"text"
                },
                
                "image_id":{
                    "type":"text"
                }
                 
             }
         }
}

log = open("access.log", 'a')

initial=es.indices.create(index='marketplace',body=body, ignore =[400,404])

print(initial)
while(True):
    for message in consumer:
        m = json.loads((message.value).decode('utf-8'))
        if m['check']==False:
            log.write(str(m)+"\n")
            log.flush()
        else:
            es.index(index='marketplace',id=m['id'],body=m['post'])
            es.indices.refresh(index='marketplace')

        counter={}
        logfile = open('access.log','r+')
        logfile = logfile.readlines()
        for i in logfile:
            line = eval(i)
            listing = line['id']
            if listing in counter:
                counter[listing]+=1
            else:
                counter[listing]=1
        for i in counter:
            try:
                es.update(index='marketplace',id=i , body={ 'script' : 'ctx._source.visits = '+str(counter[i])})
            except:
                print("error or old data")
        es.indices.refresh(index='marketplace')
    log.flush()
