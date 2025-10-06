'use client';
import Link from 'next/link';
import { type Author } from '@/lib/api';
import { useState } from 'react';


type Props = { author: Author; onDelete?: (id: string | number) => void | Promise<void>; };


export default function AuthorCard({ author, onDelete }: Props) {
        
return (
<article style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8, display: 'flex', gap: 12 }}>
<img src={author.image || 'https://placehold.co/96x96'} alt={`Foto de ${author.name}`} width={96} height={96} style={{ objectFit: 'cover', borderRadius: 8 }} />
<div style={{ flex: 1 }}>
<h3 style={{ margin: 0 }}>{author.name}</h3>
<small>{author.birthDate}</small>
<p>{author.description}</p>
<div style={{ display: 'flex', gap: 8 }}>
<small>{author.progress}</small>
<Link href={`/authors/${author.id}/edit`}><button type="button">Editar</button></Link>
<button type="button" onClick={() => onDelete?.(author.id!)}>Eliminar</button>
</div>
</div>
</article>
);
}