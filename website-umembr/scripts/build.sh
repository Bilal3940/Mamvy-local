#!/bin/bash
# Docker image build and push
echo "Building $GITHUB_REPOSITORY container image ..."

IMAGE=$CI_REGISTRY/$GITHUB_REPOSITORY

echo "Building $IMAGE image"

echo $CI_REGISTRY_PASSWORD | docker login $CI_REGISTRY -u $CI_REGISTRY_USER --password-stdin
docker system prune -a -f
docker build -t $IMAGE:$GITHUB_SHA .
docker tag $IMAGE:$GITHUB_SHA $IMAGE:latest
docker push  $IMAGE:$GITHUB_SHA
docker push  $IMAGE:latest
