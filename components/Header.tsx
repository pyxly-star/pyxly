'use client';

import { useEffect } from "react";
import { useTheme } from '@/app/theme-context';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
      }}
    >
      <div>
        <h1>Pyxly</h1>
        <p style={{ opacity: 0.7 }}>Deine Projekte</p>
      </div>

      <button
        onClick={toggleTheme}
        style={{
          background: theme === 'dark' ? '#111827' : 'transparent',
          color: theme === 'dark' ? '#fff' : '#111',
          border: '1px solid #d1d5db',
          padding: '8px 12px',
          borderRadius: 6,
        }}
      >
        {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
      </button>
    </header>
  );
}
