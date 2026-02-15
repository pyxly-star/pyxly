'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ui } from '../../ui';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const login = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/app');
    } else {
      setError('Falsches Passwort');
    }
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#020617',
        color: '#fff',
      }}
    >
      <div style={{ width: 320 }}>
        <h1 style={{ marginBottom: 16 }}>PYXLY – Login</h1>

        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ ...ui.input, marginBottom: 12 }}
        />

        <button
          style={{ ...ui.button.primary, width: '100%' }}
          onClick={login}
        >
          Zugang öffnen
        </button>

        {error && (
          <p style={{ marginTop: 12, color: '#f87171', fontSize: 14 }}>
            {error}
          </p>
        )}
      </div>
    </main>
  );
}
