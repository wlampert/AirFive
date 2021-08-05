#!/bin/bash

#This scrupt runs the spark script every 2 minutes to update the recommended listings
while true; do
docker exec -it spark-master bin/spark-submit --master spark://spark-master:7077 --total-executor-cores 2 --executor-memory 512m /app/spark_script.py
sleep 120
done