'use client';
import { useRouter } from 'next/navigation';
import { useAuthorsContext } from '@/context/AuthorsContext';
import { useState } from 'react';

export default function CreateAuthorPage() {
  const { createAuthor } = useAuthorsContext();
  const router = useRouter();

  const [form, setForm] = useState({ name: '', birthDate: '', description: '', image: '' });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await createAuthor(form);
    router.push('/authors');
  }

  return (
    <main>
      <h1>Crear autor</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" required
          value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input name="birthDate" type="date" required
          value={form.birthDate} onChange={e => setForm({ ...form, birthDate: e.target.value })} />
        <input name="image" placeholder="URL imagen"
          value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
        <textarea name="description" placeholder="Descripción"
          value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}></textarea>
        <button type="submit">Crear</button>
      </form>
    </main>
  );
}
