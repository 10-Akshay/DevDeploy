# DevDeploy

A platform to deploy GitHub repositories automatically using Docker and Kubernetes.

## Quick Start

### Prerequisites
- Node.js 20+
- Docker Desktop
- Git

### 1. Setup Minikube
```bash
chmod +x devops/scripts/setup-minikube.sh
./devops/scripts/setup-minikube.sh
```

### 2. Start Backend (development)
```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:4000
```

### 3. Start Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

### 4. Open browser
Go to http://localhost:5173, paste a GitHub URL, and click Deploy.

## Project Structure
```
devdeploy/
├── frontend/          React + Vite dashboard
├── backend/           Node.js + Express API
├── devops/
│   ├── k8s/           Kubernetes manifests
│   └── scripts/       Helper shell scripts
└── .github/workflows/ GitHub Actions CI/CD
```

## API Endpoints
- `POST /deploy`       — Start a deployment (body: `{ repoUrl }`)
- `GET /status/:id`    — Get deployment status and logs
- `GET /health`        — Health check

## Tech Stack
- **Frontend**: React 18, Vite, React Router, Axios
- **Backend**: Node.js, Express
- **DevOps**: Docker, Kubernetes (Minikube), GitHub Actions
