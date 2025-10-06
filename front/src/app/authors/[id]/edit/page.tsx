'use client';
import { useParams, useRouter } from 'next/navigation';
import { useAuthorsContext } from '@/context/AuthorsContext';
import { useState, useEffect } from 'react';
import { AuthorsAPI, type Author } from '@/lib/api';

export default function EditAuthorPage() {
  const { id } = useParams<{ id: string }>();
  const { updateAuthor } = useAuthorsContext();
  const router = useRouter();
  const [author, setAuthor] = useState<Author | null>(null);

  useEffect(() => {
    AuthorsAPI.get(id).then(setAuthor);
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!author) return;
    await updateAuthor(id, author);
    router.push('/authors');
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const valueAsNumber = +e.target.value; 
  console.log(valueAsNumber);
};

  if (!author) return <p>Cargando…</p>;

  return (
    <main>
      <h1>Editar autor</h1>
      <form onSubmit={handleSubmit}>
        <input value={author.name} onChange={e => setAuthor({ ...author, name: e.target.value })} />
        <input type="date" value={author.birthDate}
          onChange={e => setAuthor({ ...author, birthDate: e.target.value })} />
        <input value={author.image} onChange={e => setAuthor({ ...author, image: e.target.value })} />
        <textarea value={author.description} onChange={e => setAuthor({ ...author, description: e.target.value })}></textarea>
        <input value={author.image} onChange={e => setAuthor({ ...author, image: e.target.value })} />
        <input value={author.progress} onChange={e => setAuthor({ ...author, progress: e.target.valueAsNumber })}></input>
        <button type="submit">Guardar</button>
      </form>
    </main>
  );
}
