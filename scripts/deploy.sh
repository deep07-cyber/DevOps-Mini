#!/bin/bash
set -e

echo "Pulling image..."
docker pull harshit0103/portfolio:latest

echo "Stopping old container..."
docker stop flaskapp || true
docker rm flaskapp || true

echo "Running new container..."
docker run -d --name flaskapp  -p 5000:5000 -e PORT=5000  harshit0103/portfolio:latest
