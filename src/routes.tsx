import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AppLayout } from './components/layout/AppLayout';
import { Login } from './views/Auth/Login';
import { Home } from './views/Home/home';
import { PacienteList } from './views/Atendimentos/Pacientes/PacienteList';
import { PacienteCreate } from './views/Atendimentos/Pacientes/PacienteCreate';
import { PacienteEdit } from './views/Atendimentos/Pacientes/PacienteEdit';
import { PacienteShow } from './views/Atendimentos/Pacientes/PacienteShow';
import { EvolucaoRcpCreate } from './views/Atendimentos/EvolucaoRCP/EvolucaoRcpCreate';
import { EvolucaoRcpList } from './views/Atendimentos/EvolucaoRCP/EvolucaoRcpList';
import { EvolucaoEdit } from './views/Atendimentos/EvolucaoRCP/EvolucaoEdit';
import { EvolucaoDnmCreate } from './views/Atendimentos/EvolucaoDNM/EvolucaoDnmCreate';
import { EvolucaoDnmList } from './views/Atendimentos/EvolucaoDNM/EvolucaoDnmList';

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
                <Route
                  path="/evolucao_rcp/edit/:id"
                  element={<EvolucaoEdit />}
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
            </AppLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
