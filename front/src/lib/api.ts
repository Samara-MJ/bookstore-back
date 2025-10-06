const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8080";

async function readBody(res: Response) {
  const txt = await res.text();
  try { return txt ? JSON.parse(txt) : null; } catch { return txt || null; }
}

export async function api<T = any>(path: string, init?: RequestInit): Promise<T> {
  const url = `${BASE}${path}`;
  const res = await fetch(url, {
    cache: "no-store",
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
  });
  const data = await readBody(res);

  if (!res.ok) throw new Error(data?.message || res.statusText);
  return data as T;
}

export type Author = {
  id?: number | string;
  name: string;
  description: string;
  image: string;
  birthDate: string;
  progress : number ;
};

export const AuthorsAPI = {
  list: (): Promise<Author[]> => api("/api/authors"),
  get: (id: string | number): Promise<Author> => api(`/api/authors/${id}`),
  create: (data: Author): Promise<Author> =>
    api("/api/authors", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string | number, data: Partial<Author>): Promise<Author> =>
    api(`/api/authors/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  remove: (id: string | number): Promise<void> =>
    api(`/api/authors/${id}`, { method: "DELETE" }),
};
