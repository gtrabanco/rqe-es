#!/usr/bin/env bash

if [[ $# -eq 0 ]] ; then
echo "Usage: $0 <volume_name> <mongo_container_name> <port_mongo>"
echo "Example:"
echo "\t $0 rqe-data rqe-mongo 27017"
exit 0
fi

export APP_PORT=27017
export DOCKER_IMAGE=mongodb
export IMAGE_TAG=3
export CONTAINER_RAM=1G
export DOCKER_BIN=/usr/bin/docker


export VOLUME_NAME=$1 #rqe-data
export CONTAINER_NAME=$2 #rqe-mongo
export CONTAINER_PORT=$3 #27017

echo "Creating volume..."

$DOCKER_BIN volume create --name $VOLUME_NAME

sleep 1

echo "Initiating mongodb..."

./mongo.sh $VOLUME_NAME $CONTAINER_NAME $CONTAINER_PORT

sleep 1

echo "Running main script"

./runall.sh