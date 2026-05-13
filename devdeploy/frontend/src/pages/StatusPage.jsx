import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import StatusBadge from '../components/StatusBadge';
import LogViewer from '../components/LogViewer';

const TERMINAL_STATES = ['success', 'failed'];
const POLL_INTERVAL = 3000;

const STEPS = ['pending', 'cloning', 'building', 'dockerizing', 'deploying', 'success'];

function PipelineSteps({ status }) {
  const currentIdx = STEPS.indexOf(status);
  const failed = status === 'failed';

  return (
    <div
      style={{
        background: '#1a2232',
        border: '1px solid #1e293b',
        borderRadius: 12,
        padding: '20px 24px',
        marginBottom: 16,
      }}
    >
      <p
        style={{
          color: '#475569',
          fontSize: 12,
          textTransform: 'uppercase',
          letterSpacing: 1,
          marginBottom: 16,
        }}
      >
        Pipeline
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'wrap' }}>
        {STEPS.map((step, i) => {
          const done = i < currentIdx || status === 'success';
          const active = i === currentIdx && !failed;
          const isFailed = failed && i === currentIdx;

          return (
            <React.Fragment key={step}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 600,
                    background: isFailed
                      ? '#7f1d1d'
                      : done
                      ? '#14532d'
                      : active
                      ? '#1e3a5f'
                      : '#0f172a',
                    border: `2px solid ${
                      isFailed ? '#ef4444' : done ? '#22c55e' : active ? '#3b82f6' : '#1e293b'
                    }`,
                    color: isFailed
                      ? '#f87171'
                      : done
                      ? '#4ade80'
                      : active
                      ? '#60a5fa'
                      : '#475569',
                  }}
                >
                  {done ? '✓' : isFailed ? '✗' : i + 1}
                </div>
                <span
                  style={{
                    fontSize: 11,
                    color: active ? '#60a5fa' : done ? '#4ade80' : '#475569',
                  }}
                >
                  {step}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: 2,
                    minWidth: 16,
                    margin: '0 4px',
                    marginBottom: 20,
                    background: i < currentIdx ? '#22c55e' : '#1e293b',
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default function StatusPage() {
  const { id } = useParams();
  const [deployment, setDeployment] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let timer;

    async function poll() {
      try {
        const { data } = await axios.get(`/status/${id}`);
        setDeployment(data);
        if (!TERMINAL_STATES.includes(data.status)) {
          timer = setTimeout(poll, POLL_INTERVAL);
        }
      } catch (err) {
        setError('Could not fetch deployment status.');
      }
    }

    poll();
    return () => clearTimeout(timer);
  }, [id]);

  if (error) return <div style={{ color: '#f87171', padding: 24 }}>{error}</div>;

  if (!deployment)
    return <div style={{ color: '#64748b', padding: 24 }}>Loading deployment status...</div>;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <Link
          to="/"
          className="btn btn-secondary"
          style={{ fontSize: 13, padding: '6px 14px' }}
        >
          ← New Deploy
        </Link>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Deployment Status</h1>
      </div>

      {/* Info Card */}
      <div
        style={{
          background: '#1a2232',
          border: '1px solid #1e293b',
          borderRadius: 12,
          padding: 24,
          marginBottom: 20,
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <p
              style={{
                color: '#475569',
                fontSize: 12,
                textTransform: 'uppercase',
                letterSpacing: 1,
                marginBottom: 6,
              }}
            >
              Status
            </p>
            <StatusBadge status={deployment.status} />
          </div>
          <div>
            <p
              style={{
                color: '#475569',
                fontSize: 12,
                textTransform: 'uppercase',
                letterSpacing: 1,
                marginBottom: 6,
              }}
            >
              Deployment ID
            </p>
            <span style={{ fontFamily: 'monospace', fontSize: 13, color: '#94a3b8' }}>{id}</span>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <p
              style={{
                color: '#475569',
                fontSize: 12,
                textTransform: 'uppercase',
                letterSpacing: 1,
                marginBottom: 6,
              }}
            >
              Repository
            </p>
            <a href={deployment.repoUrl} target="_blank" rel="noreferrer" style={{ fontSize: 14 }}>
              {deployment.repoUrl}
            </a>
          </div>
        </div>
      </div>

      {/* Live URL card */}
      {deployment.liveUrl && (
        <div
          style={{
            background: '#0d2218',
            border: '1px solid #166534',
            borderRadius: 12,
            padding: 20,
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <p style={{ color: '#4ade80', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
              ✅ App is live!
            </p>
            <a
              href={deployment.liveUrl}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: 15, color: '#86efac' }}
            >
              {deployment.liveUrl}
            </a>
          </div>
          <a
            href={deployment.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
            style={{ flexShrink: 0 }}
          >
            Open App ↗
          </a>
        </div>
      )}

      {/* Pipeline steps */}
      <PipelineSteps status={deployment.status} />

      {/* Logs */}
      <LogViewer logs={deployment.logs} />

      {/* Timestamps */}
      <div style={{ marginTop: 16, color: '#334155', fontSize: 12 }}>
        Started: {new Date(deployment.createdAt).toLocaleString()} · Updated:{' '}
        {new Date(deployment.updatedAt).toLocaleString()}
      </div>
    </div>
  );
}
