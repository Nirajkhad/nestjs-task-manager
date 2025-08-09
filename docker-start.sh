#!/bin/bash

# Define your custom network name
NETWORK_NAME="task-management-network"

# Check if the network exists; if not, create it
if ! docker network ls --format '{{.Name}}' | grep -wq "$NETWORK_NAME"; then
  echo "Network '$NETWORK_NAME' does not exist. Creating..."
  docker network create "$NETWORK_NAME"
else
  echo "Network '$NETWORK_NAME' already exists."
fi

# Navigate to the directory containing your docker-compose.yml
cd "$(dirname "$0")"

# Stop and remove any existing containers without removing volumes or networks
docker compose down

# Start the containers in detached mode
docker compose up

