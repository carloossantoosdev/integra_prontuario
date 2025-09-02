import React from 'react';
import { ThemedLayoutV2 } from '@refinedev/mui';
import { ErrorComponent } from '@refinedev/mui';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Authenticated } from '@refinedev/core';
import { Header } from './components';
import { Home } from './views/Home/home';
import { EvolucaoRcpCreate } from './views/Atendimentos/EvolucaoRCP/EvolucaoRcpCreate';
import { EvolucaoRcpList } from './views/Atendimentos/EvolucaoRCP/EvolucaoRcpList';
import { EvolucaoDnmCreate } from './views/Atendimentos/EvolucaoDNM/EvolucaoDnmCreate';
import { EvolucaoDnmList } from './views/Atendimentos/EvolucaoDNM/EvolucaoDnmList';
import { PacienteList } from './views/Atendimentos/Pacientes/PacienteList';
import { PacienteEdit } from './views/Atendimentos/Pacientes/PacienteEdit';
import { PacienteShow } from './views/Atendimentos/Pacientes/PacienteShow';
import { PacienteCreate } from './views/Atendimentos/Pacientes/PacienteCreate';
import { EvolucaoEdit } from './views/Atendimentos/EvolucaoRCP/EvolucaoEdit';
import { Login } from './views/Auth/Login';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        element={
          <Authenticated key="protected-routes">
            <ThemedLayoutV2 Header={Header}>
              <Outlet />
            </ThemedLayoutV2>
          </Authenticated>
        }
      >
        <Route
          path="/"
          element={<Home />}
        />

        <Route path="/pacientes">
          <Route
            index
            element={<PacienteList />}
          />
          <Route
            path="create"
            element={<PacienteCreate />}
          />
          <Route
            path="edit/:id"
            element={<PacienteEdit />}
          />
          <Route
            path="show/:id"
            element={<PacienteShow />}
          />
        </Route>

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
          element={<ErrorComponent />}
        />
      </Route>
    </Routes>
  );
};
