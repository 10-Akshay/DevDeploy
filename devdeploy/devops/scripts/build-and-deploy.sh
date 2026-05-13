#!/bin/bash
set -e

echo "=== DevDeploy: Build and Deploy ==="

# Build backend image inside Minikube's Docker daemon
eval $(minikube docker-env)
echo "Building backend Docker image..."
docker build -t devdeploy-backend:latest ./backend

# Apply all manifests
echo "Applying Kubernetes manifests..."
kubectl apply -f devops/k8s/namespace.yaml
kubectl apply -f devops/k8s/deployment.yaml
kubectl apply -f devops/k8s/service.yaml

# Wait for rollout
echo "Waiting for backend to be ready..."
kubectl rollout status deployment/devdeploy-backend -n devdeploy

# Get service URL
MINIKUBE_IP=$(minikube ip)
echo ""
echo "✅ Backend deployed!"
echo "   API URL: http://${MINIKUBE_IP}:30400"
echo ""
echo "Start the frontend locally:"
echo "   cd frontend && npm install && npm run dev"
