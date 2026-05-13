import React, { useEffect, useRef } from 'react';

export default function LogViewer({ logs }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (!logs || logs.length === 0) return null;

  return (
    <div
      style={{
        background: '#0a0f1a',
        border: '1px solid #1e293b',
        borderRadius: 8,
        padding: '16px',
        marginTop: 16,
        maxHeight: 280,
        overflowY: 'auto',
      }}
    >
      <p
        style={{
          color: '#475569',
          fontSize: 12,
          marginBottom: 10,
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        Deployment Logs
      </p>
      {logs.map((line, i) => (
        <div
          key={i}
          style={{
            fontFamily: 'monospace',
            fontSize: 13,
            color: '#94a3b8',
            lineHeight: 1.7,
            borderBottom: '1px solid #0d1524',
            paddingBottom: 2,
          }}
        >
          {line}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
