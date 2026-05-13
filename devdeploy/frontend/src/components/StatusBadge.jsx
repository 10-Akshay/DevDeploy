import React from 'react';

const COLORS = {
  pending:     { bg: '#1e293b', text: '#94a3b8', dot: '#94a3b8' },
  cloning:     { bg: '#1e3a5f', text: '#60a5fa', dot: '#3b82f6' },
  building:    { bg: '#1e3a5f', text: '#60a5fa', dot: '#3b82f6' },
  dockerizing: { bg: '#1e3a5f', text: '#60a5fa', dot: '#3b82f6' },
  deploying:   { bg: '#2d2a1a', text: '#fbbf24', dot: '#f59e0b' },
  success:     { bg: '#14290e', text: '#4ade80', dot: '#22c55e' },
  failed:      { bg: '#2d1414', text: '#f87171', dot: '#ef4444' },
};

export default function StatusBadge({ status }) {
  const c = COLORS[status] || COLORS.pending;
  const isSpinning = ['cloning', 'building', 'dockerizing', 'deploying'].includes(status);

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        padding: '4px 12px',
        borderRadius: 999,
        background: c.bg,
        color: c.text,
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: 0.3,
        border: `1px solid ${c.dot}33`,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: c.dot,
          animation: isSpinning ? 'pulse 1.2s ease-in-out infinite' : 'none',
        }}
      />
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
      {status}
    </span>
  );
}
