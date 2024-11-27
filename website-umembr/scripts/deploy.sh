#!/bin/bash

# ---
# Create certificates for connecting to docker swarm
# ---

# ---
# Signin into Gitlab docker registry
# ---

echo "Signing into docker registry ..."

echo $CI_REGISTRY_PASSWORD | docker login $CI_REGISTRY -u $CI_REGISTRY_USER --password-stdin

# ---
# Deploy service
# ---
SERVICE_NAME="website-umembr"
SERVICES=$(docker service ls --filter name=$SERVICE_NAME-$ENVIRONMENT -q | wc -l)
IMAGE=$CI_REGISTRY/$GITHUB_REPOSITORY:$GITHUB_SHA
if [[ "$SERVICES" -gt 0 ]]; then
  echo "Updating $SERVICE_NAME-$ENVIRONMENT ... ==> $IMAGE"

  # Update service
  docker service update \
    --with-registry-auth \
    --image "$IMAGE" \
    --replicas $REPLICAS \
    -d \
    --hostname $SERVICE_NAME-$ENVIRONMENT \
    --force \
    $SERVICE_NAME-$ENVIRONMENT
else
  echo "Creating $SERVICE_NAME-$ENVIRONMENT ... ==> $IMAGE"

  # Create service
  docker service create \
    --with-registry-auth \
    --name $SERVICE_NAME-$ENVIRONMENT \
    --replicas $REPLICAS \
    -d \
    --network $NETWORK \
    --hostname $SERVICE_NAME-$ENVIRONMENT \
    "$IMAGE"
fi

# Check service is running ...
docker service ps $SERVICE_NAME-$ENVIRONMENT
docker system prune -a -f
docker system df
