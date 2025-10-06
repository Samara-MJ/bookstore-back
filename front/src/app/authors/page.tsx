'use client';
import { useAuthorsContext } from '@/context/AuthorsContext';

export default function AuthorsPage() {
  const { authors, loading, error, deleteAuthor } = useAuthorsContext();

  function setAuthor(arg0: any): void {
    throw new Error('Function not implemented.');
  }

  return (
    <main style={{ padding: 16 }}>
      <h1>Autores</h1>
      {loading && <p>Cargando…</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <section
        style={{
          display: 'grid',
          gap: 12,
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        }}
      >
        {authors.map((a) => (
          <article
            key={a.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: 8,
              padding: 12,
              background: '#fff',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={a.image || 'https://placehold.co/300x200?text=Sin+Imagen'}
              alt={a.name}
              style={{
                width: '100%',
                height: 180,
                objectFit: 'cover',
                borderRadius: 8,
                marginBottom: 8,
              }}
            />
            <h3 style={{ margin: '4px 0' }}>{a.name}</h3>
            <small>{a.birthDate}</small>
            <p>{a.description}</p>
            <small>{a.progress}</small>
              

            <div style={{ display: 'flex', gap: 8 }}>
              <a href={`/authors/${a.id}/edit`}>
                <button type="button">Editar</button>
              </a>
              <button type="button" onClick={() => deleteAuthor(a.id!)}>
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
