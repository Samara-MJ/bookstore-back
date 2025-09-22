'use client';
import { createContext, useContext } from 'react';
import { useAuthors } from '@/hooks/useAuthors';

const AuthorsCtx = createContext<ReturnType<typeof useAuthors> | null>(null);

export function AuthorsProvider({ children }: { children: React.ReactNode }) {
  const value = useAuthors();
  return <AuthorsCtx.Provider value={value}>{children}</AuthorsCtx.Provider>;
}

export function useAuthorsContext() {
  const ctx = useContext(AuthorsCtx);
  if (!ctx) throw new Error('useAuthorsContext debe usarse dentro de <AuthorsProvider>');
  return ctx;
}
