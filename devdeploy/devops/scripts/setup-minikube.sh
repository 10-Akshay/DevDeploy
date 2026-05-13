#!/bin/bash
set -e

echo "=== Setting up Minikube for DevDeploy ==="

# Check prerequisites
command -v docker >/dev/null 2>&1 || {
  echo "Docker is required. Install from https://docs.docker.com/get-docker/"
  exit 1
}

# Install Minikube (Linux/macOS)
if ! command -v minikube &>/dev/null; then
  echo "Installing Minikube..."
  curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
  sudo install minikube-linux-amd64 /usr/local/bin/minikube
  rm minikube-linux-amd64
fi

# Install kubectl
if ! command -v kubectl &>/dev/null; then
  echo "Installing kubectl..."
  curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
  sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
  rm kubectl
fi

# Start Minikube with Docker driver
echo "Starting Minikube..."
minikube start --driver=docker --memory=4096 --cpus=2

# Enable addons
minikube addons enable ingress
minikube addons enable dashboard

# Create namespace
kubectl create namespace devdeploy --dry-run=client -o yaml | kubectl apply -f -

echo ""
echo "✅ Minikube is ready!"
echo "   Minikube IP: $(minikube ip)"
echo "   Dashboard:   run 'minikube dashboard' to open"
