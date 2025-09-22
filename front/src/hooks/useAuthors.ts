'use client';
const BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://127.0.0.1:8080';
import { useEffect, useMemo, useState } from 'react';
import { AuthorsAPI, type Author } from '@/lib/api';

export function useAuthors() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      const data = await AuthorsAPI.list();
      setAuthors(data ?? []);
    } catch (e:any) {
      setError(e.message);
    }
  }

  useEffect(() => { load(); }, []);

  async function createAuthor(input: Author) {
    const created = await AuthorsAPI.create(input);
    if (created && created.id) setAuthors(prev => [created, ...prev]);
    else await load();
  }

  async function updateAuthor(id: string | number, patch: Partial<Author>) {
    const updated = await AuthorsAPI.update(id, patch);
    setAuthors(prev => prev.map(a => String(a.id) === String(id) ? { ...a, ...updated } : a));
  }

  async function deleteAuthor(id: string | number) {
  if (!confirm('¿Eliminar autor?')) return;
  try {
    const res = await fetch(`${BASE}/api/authors/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const txt = await res.text();
      alert(txt || `No se pudo eliminar (HTTP ${res.status})`);
      return; 
    }

    setAuthors(prev => prev.filter(a => String(a.id) !== String(id)));
  } catch (e: any) {
    alert(e?.message || 'Error eliminando autor porque tiene asociado libros');
  }
}
  const byId = useMemo(() => new Map(authors.map(a => [String(a.id), a])), [authors]);
  return { authors, loading, error, createAuthor, updateAuthor, deleteAuthor, byId, reload: load };
}
