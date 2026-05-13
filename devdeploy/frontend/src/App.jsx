import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import DeployPage from './pages/DeployPage';
import StatusPage from './pages/StatusPage';

export default function App() {
  const { pathname } = useLocation();

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 20px' }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 0',
          borderBottom: '1px solid #1e293b',
          marginBottom: 32,
        }}
      >
        <Link
          to="/"
          style={{ color: '#fff', fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}
        >
          ⚙️ DevDeploy
        </Link>
        <nav style={{ display: 'flex', gap: 8 }}>
          <Link
            to="/"
            style={{
              padding: '6px 14px',
              borderRadius: 6,
              fontSize: 14,
              background: pathname === '/' ? '#1e293b' : 'transparent',
              color: pathname === '/' ? '#e2e8f0' : '#94a3b8',
            }}
          >
            Deploy
          </Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<DeployPage />} />
          <Route path="/status/:id" element={<StatusPage />} />
        </Routes>
      </main>
    </div>
  );
}
