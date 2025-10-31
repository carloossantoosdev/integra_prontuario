import { BrowserRouter } from 'react-router-dom';
import { QueryProvider } from './providers/QueryProvider';
import { AuthProvider } from './providers/AuthProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { Toaster } from 'sonner';
import { AppRoutes } from './routes';

export function App() {
  return (
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          <ThemeProvider
            defaultTheme="light"
            storageKey="integra-ui-theme"
          >
            <Toaster
              position="bottom-right"
              richColors
            />
            <AppRoutes />
          </ThemeProvider>
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  );
}
