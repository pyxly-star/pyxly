'use client';

import { useEffect, useState } from 'react';

type Project = {
  id: number;
  name: string;
};

export default function Page() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Projekte laden
  useEffect(() => {
    fetch('http://localhost:3001/projects')
      .then(res => res.json())
      .then(setProjects)
      .catch(() => setMessage('❌ Fehler beim Laden'));
  }, []);

  // Projekt anlegen
  async function createProject(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('http://localhost:3000/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error();

      const newProject = await res.json();
      setProjects([...projects, newProject]);
      setName('');
      setMessage('✅ Projekt erfolgreich erstellt');
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

