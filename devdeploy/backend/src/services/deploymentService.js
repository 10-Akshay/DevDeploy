const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const store = require('../store/deploymentStore');

const WORK_DIR = path.join('/tmp', 'devdeploy-workspaces');

function run(cmd, cwd) {
  return new Promise((resolve, reject) => {
    exec(cmd, { cwd, timeout: 300_000 }, (err, stdout, stderr) => {
      if (err) return reject(new Error(stderr || err.message));
      resolve(stdout.trim());
    });
  });
}

async function runDeploy(id, repoUrl) {
  const log = (msg) => {
    console.log(`[${id}] ${msg}`);
    store.appendLog(id, msg);
  };

  const workspacePath = path.join(WORK_DIR, id);

  try {
    // ── STEP 1: Clone ──────────────────────────────────────────
    store.update(id, { status: 'cloning' });
    log(`Cloning repository: ${repoUrl}`);
    fs.mkdirSync(workspacePath, { recursive: true });
    await run(`git clone --depth=1 ${repoUrl} app`, workspacePath);
    log('Clone complete.');

    const appPath = path.join(workspacePath, 'app');

    // ── STEP 2: Build ──────────────────────────────────────────
    store.update(id, { status: 'building' });
    log('Detected project. Running build...');

    const hasPkg = fs.existsSync(path.join(appPath, 'package.json'));
    if (hasPkg) {
      log('Found package.json — running npm install');
      await run('npm install', appPath);

      const pkg = JSON.parse(fs.readFileSync(path.join(appPath, 'package.json'), 'utf8'));
      if (pkg.scripts && pkg.scripts.build) {
        log('Running npm run build');
        await run('npm run build', appPath);
      }
    } else {
      log('No package.json found. Skipping Node build step.');
    }
    log('Build complete.');

    // ── STEP 3: Write Dockerfile if missing ───────────────────
    store.update(id, { status: 'dockerizing' });
    const dockerfilePath = path.join(appPath, 'Dockerfile');
    if (!fs.existsSync(dockerfilePath)) {
      log('No Dockerfile found. Auto-generating one...');
      const autoDockerfile = `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
`;
      fs.writeFileSync(dockerfilePath, autoDockerfile);
    }

    const imageName = `devdeploy-app-${id}`;
    log(`Building Docker image: ${imageName}`);
    await run(`docker build -t ${imageName}:latest .`, appPath);
    log('Docker image built.');

    // Load image into Minikube's Docker daemon
    log('Loading image into Minikube...');
    await run(`minikube image load ${imageName}:latest`, appPath);
    log('Image loaded into Minikube.');

    // ── STEP 4: Deploy to Kubernetes ──────────────────────────
    store.update(id, { status: 'deploying' });
    log('Writing Kubernetes manifests...');

    const k8sDeployment = `
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-${id}
  namespace: devdeploy
spec:
  replicas: 1
  selector:
    matchLabels:
      app: app-${id}
  template:
    metadata:
      labels:
        app: app-${id}
    spec:
      containers:
      - name: app
        image: ${imageName}:latest
        imagePullPolicy: Never
        ports:
        - containerPort: 3000
`;

    const k8sService = `
apiVersion: v1
kind: Service
metadata:
  name: svc-${id}
  namespace: devdeploy
spec:
  type: NodePort
  selector:
    app: app-${id}
  ports:
  - port: 80
    targetPort: 3000
    nodePort: 0
`;

    fs.writeFileSync(path.join(workspacePath, 'deployment.yaml'), k8sDeployment);
    fs.writeFileSync(path.join(workspacePath, 'service.yaml'), k8sService);

    // Apply namespace first
    await run(
      'kubectl create namespace devdeploy --dry-run=client -o yaml | kubectl apply -f -',
      workspacePath
    );
    await run('kubectl apply -f deployment.yaml -f service.yaml', workspacePath);
    log('Kubernetes manifests applied.');

    // Wait for rollout
    log('Waiting for deployment to be ready...');
    await run(
      `kubectl rollout status deployment/app-${id} -n devdeploy --timeout=120s`,
      workspacePath
    );

    // Get NodePort URL
    const minikubeIp = await run('minikube ip', workspacePath);
    const nodePort = await run(
      `kubectl get service svc-${id} -n devdeploy -o jsonpath='{.spec.ports[0].nodePort}'`,
      workspacePath
    );
    const liveUrl = `http://${minikubeIp}:${nodePort}`;

    log(`Deployment successful! Live at: ${liveUrl}`);
    store.update(id, { status: 'success', liveUrl });
  } catch (err) {
    log(`ERROR: ${err.message}`);
    store.update(id, { status: 'failed' });
  }
}

module.exports = { runDeploy };
