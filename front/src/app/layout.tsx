import { AuthorsProvider } from '@/context/AuthorsContext';

export const metadata = { title: 'Autores CRUD' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthorsProvider>
          <nav>
            <a href="/authors">Autores</a> | <a href="/crear">Crear</a>
          </nav>
          {children}
        </AuthorsProvider>
      </body>
    </html>
  );
}
