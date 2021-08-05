from pyspark import SparkContext
from itertools import combinations
import requests

# 
def combination(pair):
  item_list = pair[1]
  user = pair[0]
  return [(tuple(sorted(v)), user) for v in combinations(item_list, 2)]


sc = SparkContext("spark://spark-master:7077", "PopularItems")

r = requests.get('http://models:8000/api/v1/services/recommendation/deleteAll/')
print(r.text)

data = sc.textFile("/app/access.log", 2)     									# each worker loads a piece of the data file
dicts = data.map(lambda line: line.split("\t"))   								# tell each worker to split each line of it's partition													
pairs = dicts.map(lambda dic: (eval(dic[0])["user"], eval(dic[0])["id"]))  		# re-layout the dictionaries into pairs of (user, item id)
pairs = pairs.distinct()														# get rid of any duplicates
pairs = pairs.filter(lambda x: x[0] >= 0)										# get rid of any pairs with user_id = -1 (non logged in users)
user_listofitems = pairs.groupByKey().map(lambda x: (x[0], list(x[1])))			# re-layout the pairs into pairs of (user, list of item ids)
user_itempair = user_listofitems.map(combination).flatMap(lambda x : x)			# re-layout the pairs into pairs of (user, (item1, item2))
itempair_listofusers = user_itempair.groupByKey().map(lambda x: (x[0], tuple(x[1])))	# re-layout the pairs into pairs of ((item1, item2), list of user ids)
itempair_count = itempair_listofusers.map(lambda x: (x[0], len(x[1])))			# re-layout the pairs into pairs of ((item1, item2), number of users)
itempair_count = itempair_count.filter(lambda x: x[1] >= 3)						#Filter out all item pairs with less than 3 users



output = itempair_count.collect()                          						# bring the data back to the master node so we can print it out
for itempair, count in output:
	print("Item pair: " + str(itempair) + " , count: " + str(count))
	r1 = requests.post('http://models:8000/api/v1/services/recommendation/new/', data={'item_id' : int(itempair[0]), 'recommended_items' : int(itempair[1])})
	print(r1.text)
	r2 = requests.post('http://models:8000/api/v1/services/recommendation/new/', data={'item_id' : int(itempair[1]), 'recommended_items' : int(itempair[0])})
	print(r2.text)
print ("Popular items done")

sc.stop()





