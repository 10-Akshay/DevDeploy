// In-memory store (replace with Redis or DB in production)
const deployments = new Map();

function create(id, repoUrl) {
  const record = {
    id,
    repoUrl,
    status: 'pending', // pending | cloning | building | dockerizing | deploying | success | failed
    logs: [],
    liveUrl: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  deployments.set(id, record);
  return record;
}

function get(id) {
  return deployments.get(id) || null;
}

function update(id, patch) {
  const existing = deployments.get(id);
  if (!existing) return null;
  const updated = { ...existing, ...patch, updatedAt: new Date().toISOString() };
  deployments.set(id, updated);
  return updated;
}

function appendLog(id, line) {
  const existing = deployments.get(id);
  if (!existing) return;
  existing.logs.push(`[${new Date().toISOString()}] ${line}`);
  existing.updatedAt = new Date().toISOString();
}

module.exports = { create, get, update, appendLog };
