import { BrowserRouter } from 'react-router-dom';
import { QueryProvider } from './providers/QueryProvider';
import { AuthProvider } from './providers/AuthProvider';
import { Toaster } from 'sonner';
import { AppRoutes } from './routes';

export function App() {
  return (
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          <Toaster
            position="bottom-right"
            richColors
          />
          <AppRoutes />
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  );
}
