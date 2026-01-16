import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AppLayout } from './components/layout/AppLayout';

// Importações diretas (páginas carregadas imediatamente)
import { Login } from './views/Auth/Login';
import { Home } from './views/Home/home';

// Lazy loading (páginas carregadas sob demanda)
const PacienteList = lazy(() => import('./views/Atendimentos/Pacientes/PacienteList').then(m => ({ default: m.PacienteList })));
const PacienteCreate = lazy(() => import('./views/Atendimentos/Pacientes/PacienteCreate').then(m => ({ default: m.PacienteCreate })));
const PacienteEdit = lazy(() => import('./views/Atendimentos/Pacientes/PacienteEdit').then(m => ({ default: m.PacienteEdit })));
const PacienteShow = lazy(() => import('./views/Atendimentos/Pacientes/PacienteShow').then(m => ({ default: m.PacienteShow })));
const EvolucaoRcpCreate = lazy(() => import('./views/Atendimentos/EvolucaoRCP/EvolucaoRcpCreate').then(m => ({ default: m.EvolucaoRcpCreate })));
const EvolucaoRcpList = lazy(() => import('./views/Atendimentos/EvolucaoRCP/EvolucaoRcpList').then(m => ({ default: m.EvolucaoRcpList })));
const EvolucaoDnmCreate = lazy(() => import('./views/Atendimentos/EvolucaoDNM/EvolucaoDnmCreate').then(m => ({ default: m.EvolucaoDnmCreate })));
const EvolucaoDnmList = lazy(() => import('./views/Atendimentos/EvolucaoDNM/EvolucaoDnmList').then(m => ({ default: m.EvolucaoDnmList })));

// Componente de loading
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="*"
        element={
          <ProtectedRoute>
            <AppLayout>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                  <Route
                    path="/"
                    element={<Home />}
                  />

                  {/* Pacientes */}
                  <Route
                    path="/pacientes"
                    element={<PacienteList />}
                  />
                  <Route
                    path="/pacientes/create"
                    element={<PacienteCreate />}
                  />
                  <Route
                    path="/pacientes/edit/:id"
                    element={<PacienteEdit />}
                  />
                  <Route
                    path="/pacientes/show/:id"
                    element={<PacienteShow />}
                  />

                  {/* Evolução RCP */}
                  <Route
                    path="/evolucao_rcp/create/:pacienteId"
                    element={<EvolucaoRcpCreate />}
                  />
                  <Route
                    path="/evolucao_rcp"
                    element={<EvolucaoRcpList />}
                  />

                  {/* Evolução DNM */}
                  <Route
                    path="/evolucao_dnm/create/:pacienteId"
                    element={<EvolucaoDnmCreate />}
                  />
                  <Route
                    path="/evolucao_dnm"
                    element={<EvolucaoDnmList />}
                  />

                  <Route
                    path="*"
                    element={
                      <Navigate
                        to="/"
                        replace
                      />
                    }
                  />
                </Routes>
              </Suspense>
            </AppLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
