'use client';
import { useState } from 'react';
import type { Author } from '@/lib/api';


type Props = {
initial?: Partial<Author>;
onSubmit: (data: Author) => Promise<void> | void;
submitLabel?: string;
};


export default function AuthorForm({ initial, onSubmit, submitLabel = 'Guardar' }: Props) {
const [form, setForm] = useState<Author>({
name: initial?.name ?? '',
description: initial?.description ?? '',
image: initial?.image ?? '',
birthDate: initial?.birthDate ?? ''
});
const [touched, setTouched] = useState<Record<string, boolean>>({});
const [submitting, setSubmitting] = useState(false);
const [error, setError] = useState<string | null>(null);


const nameError = !form.name && touched.name ? 'Nombre requerido' : '';
const birthError = !form.birthDate && touched.birthDate ? 'Fecha requerida' : '';
const hasErrors = !!(nameError || birthError);


function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
const { name, value } = e.target;
setForm((f) => ({ ...f, [name]: value }));
}
function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
const { name } = e.target; setTouched((t) => ({ ...t, [name]: true }));
}


async function handleSubmit(e: React.FormEvent) {
e.preventDefault(); setTouched({ name: true, birthDate: true });
if (hasErrors) return;
setSubmitting(true); setError(null);
try { await onSubmit(form); }
catch (e: any) { setError(e.message); }
finally { setSubmitting(false); }
}


return (
<form onSubmit={handleSubmit} style={{ maxWidth: 540 }}>
<label htmlFor="name">Nombre</label>
<input id="name" name="name" value={form.name} onChange={handleChange} onBlur={handleBlur}
aria-invalid={!!nameError} aria-describedby={nameError ? 'name-error' : undefined}
placeholder="Gabriel García Márquez" />
{nameError && <p id="name-error" role="alert" style={{ color: 'crimson' }}>{nameError}</p>}


<label htmlFor="birthDate">Fecha de nacimiento</label>
<input id="birthDate" name="birthDate" type="date" value={form.birthDate}
onChange={handleChange} onBlur={handleBlur}
aria-invalid={!!birthError} aria-describedby={birthError ? 'birth-error' : undefined} />
{birthError && <p id="birth-error" role="alert" style={{ color: 'crimson' }}>{birthError}</p>}


<label htmlFor="image">Imagen (URL)</label>
<input id="image" name="image" value={form.image} onChange={handleChange} onBlur={handleBlur} placeholder="https://..." />


<label htmlFor="description">Descripción</label>
<textarea id="description" name="description" value={form.description} onChange={handleChange} onBlur={handleBlur} placeholder="Autor colombiano..." />


<button type="submit" disabled={submitting || hasErrors}>{submitLabel}</button>
{error && <p role="alert" style={{ color: 'crimson' }}>{error}</p>}
</form>
);
}