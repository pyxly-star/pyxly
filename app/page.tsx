'use client';

import { useEffect, useState } from 'react';

type Project = {
  id: number;
  name: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function Page() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/projects`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setProjects)
      .catch(() => setMessage('❌ Fehler beim Laden'));
  }, []);

  async function createProject(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error();

      const newProject = await res.json();
      setProjects(prev => [...prev, newProject]);
      setName('');
      setMessage('✅ Projekt erstellt');
    } catch {
      setMessage('❌ Fehler beim Erstellen');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Meine Projekte</h1>

      <form onSubmit={createProject} style={{ marginBottom: 20 }}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Projektname"
          required
        />
        <button disabled={loading} style={{ marginLeft: 10 }}>
          {loading ? 'Speichern…' : 'Projekt anlegen'}
        </button>
      </form>

      {message && <p>{message}</p>}

      <ul>
        {projects.map(p => (
          <li key={p.id}>
            {p.id}: {p.name}
          </li>
        ))}
      </ul>
    </main>
  );
}


