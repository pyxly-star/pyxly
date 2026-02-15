'use client';

import { useEffect, useState } from 'react';
import { ui } from '../ui';

type Project = {
  id: number;
  name: string;
};

const BACKEND = 'http://localhost:3001/projects';

/* 🔑 ÄNDERE HIER DEIN PASSWORT */
const APP_PASSWORD = 'PYXLYdasProjekt2026';

export default function AppPage() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [projects, setProjects] = useState<Project[]>([]);
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  /* ---------- AUTH CHECK ---------- */
  useEffect(() => {
    const ok = sessionStorage.getItem('pyxly-auth') === 'true';
    setAuthorized(ok);
  }, []);

  const checkPassword = () => {
    if (password === APP_PASSWORD) {
      sessionStorage.setItem('pyxly-auth', 'true');
      setAuthorized(true);
    } else {
      setError('Falsches Passwort');
    }
  };

  /* ---------- THEME ---------- */
  useEffect(() => {
    const saved = (localStorage.getItem('theme') as 'dark' | 'light') ?? 'dark';
    setTheme(saved);
    document.body.style.background = saved === 'dark' ? '#020617' : '#f9fafb';
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.body.style.background = next === 'dark' ? '#020617' : '#f9fafb';
  };

  /* ---------- DATA ---------- */
  const loadProjects = async () => {
    const res = await fetch(BACKEND);
    setProjects(await res.json());
  };

  useEffect(() => {
    if (authorized) loadProjects();
  }, [authorized]);

  const createProject = async () => {
    if (!newName.trim()) return;
    await fetch(BACKEND, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName }),
    });
    setNewName('');
    loadProjects();
  };

  const saveEdit = async (id: number) => {
    await fetch(`${BACKEND}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editingName }),
    });
    setEditingId(null);
    setEditingName('');
    loadProjects();
  };

  const deleteProject = async (id: number) => {
    if (!confirm('Projekt wirklich löschen?')) return;
    await fetch(`${BACKEND}/${id}`, { method: 'DELETE' });
    loadProjects();
  };

  if (!mounted) return null;

  /* 🔒 PASSWORT-SEITE */
  if (!authorized) {
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
          <h1 style={{ marginBottom: 16 }}>PYXLY – Intern</h1>

          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ ...ui.input, marginBottom: 12 }}
          />

          <button style={{ ...ui.button.primary, width: '100%' }} onClick={checkPassword}>
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

  /* ---------- INTERNER BEREICH ---------- */
  const dark = theme === 'dark';

  return (
    <main style={{ maxWidth: 900, margin: '40px auto', padding: 20, color: dark ? '#fff' : '#111' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <h1>PYXLY – Intern</h1>
          <p style={{ opacity: 0.7 }}>Projektverwaltung</p>
        </div>
        <button style={ui.button.ghost(dark)} onClick={toggleTheme}>
          {dark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </header>

      <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
        <input
          style={ui.input}
          placeholder="Neues Projekt"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button style={ui.button.primary} onClick={createProject}>
          Anlegen
        </button>
      </div>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px,1fr))', gap: 16 }}>
        {projects.map((p) => (
          <div key={p.id} style={ui.card(dark)}>
            {editingId === p.id ? (
              <>
                <input
                  style={{ ...ui.input, marginBottom: 10 }}
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                />
                <button style={ui.button.success} onClick={() => saveEdit(p.id)}>
                  Speichern
                </button>{' '}
                <button style={ui.button.ghost(dark)} onClick={() => setEditingId(null)}>
                  Abbrechen
                </button>
              </>
            ) : (
              <>
                <h3>{p.name}</h3>
                <button
                  style={ui.button.primary}
                  onClick={() => {
                    setEditingId(p.id);
                    setEditingName(p.name);
                  }}
                >
                  Bearbeiten
                </button>{' '}
                <button style={ui.button.danger} onClick={() => deleteProject(p.id)}>
                  Löschen
                </button>
              </>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
