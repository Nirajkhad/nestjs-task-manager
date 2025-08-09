#!/bin/bash

# Define your service name as specified in docker-compose.yml
SERVICE_NAME="task-management-api"

# Execute a bash shell inside the running container
docker compose exec "$SERVICE_NAME" sh
