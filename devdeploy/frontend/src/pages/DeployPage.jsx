import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DeployPage() {
  const [repoUrl, setRepoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleDeploy(e) {
    e.preventDefault();
    setError('');
    if (!repoUrl.trim()) return setError('Please enter a GitHub repository URL.');

    setLoading(true);
    try {
      const { data } = await axios.post('/deploy', { repoUrl: repoUrl.trim() });
      navigate(`/status/${data.deploymentId}`);
    } catch (err) {
      setError(
        err.response?.data?.error || 'Failed to start deployment. Is the backend running?'
      );
      setLoading(false);
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          Deploy a GitHub Repository
        </h1>
        <p style={{ color: '#64748b', fontSize: 16 }}>
          Paste any public GitHub repo URL. DevDeploy will clone, build, containerize, and
          deploy it to Kubernetes.
        </p>
      </div>

      <form
        onSubmit={handleDeploy}
        style={{
          background: '#1a2232',
          border: '1px solid #1e293b',
          borderRadius: 12,
          padding: 28,
        }}
      >
        <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 14 }}>
          GitHub Repository URL
        </label>
        <input
          type="url"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="https://github.com/username/repository"
          disabled={loading}
          style={{ marginBottom: 16 }}
        />

        {error && (
          <div
            style={{
              background: '#2d1414',
              border: '1px solid #7f1d1d',
              borderRadius: 6,
              padding: '10px 14px',
              color: '#f87171',
              fontSize: 14,
              marginBottom: 16,
            }}
          >
            {error}
          </div>
        )}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Starting deployment...' : '🚀 Deploy Now'}
        </button>
      </form>

      <div style={{ marginTop: 32 }}>
        <p style={{ color: '#475569', fontSize: 14, marginBottom: 12 }}>
          Try these example repos:
        </p>
        {[
          'https://github.com/expressjs/express',
          'https://github.com/heroku/node-js-sample',
        ].map((url) => (
          <div
            key={url}
            onClick={() => setRepoUrl(url)}
            style={{
              cursor: 'pointer',
              background: '#111827',
              border: '1px solid #1e293b',
              borderRadius: 6,
              padding: '8px 14px',
              marginBottom: 8,
              color: '#60a5fa',
              fontSize: 13,
              fontFamily: 'monospace',
            }}
          >
            {url}
          </div>
        ))}
      </div>
    </div>
  );
}
