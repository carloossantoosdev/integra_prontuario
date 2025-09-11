/* eslint-disable no-mixed-spaces-and-tabs */
import { Refine } from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import { RefineSnackbarProvider } from '@refinedev/mui';

import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from '@refinedev/react-router-v6';
// Supabase removido
import { BrowserRouter } from 'react-router-dom';
import { ColorModeContextProvider } from './contexts/color-mode';
import { AppRoutes } from './routes';
// Supabase removido
import firestoreDataProvider from './utils/firestoreDataProvider';
import firebaseAuthProvider from './utils/firebaseAuthProvider';
import AcUnitIcon from '@mui/icons-material/AcUnit';

export function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={firestoreDataProvider}
              authProvider={firebaseAuthProvider}
              routerProvider={routerBindings}
              notificationProvider={{
                open: ({ key, message, type, description }) => {
                  // RefineSnackbarProvider já provê UI, apenas mapeamos tipos
                  // A própria lib intercepta via useNotification, então podemos manter vazio
                },
                close: (key?: string) => {
                  // noop
                },
              }}
              resources={[
                {
                  name: 'pacientes',
                  list: '/pacientes',
                  create: '/paciente/create',
                  edit: '/pacientes/edit/:id',
                  show: '/pacientes/show/:id',
                  meta: {
                    canDelete: true,
                    label: 'Cadastrar Paciente',
                  },
                },
                // KPIs após Cadastrar Paciente no menu
                {
                  name: 'kpis_dashboard',
                  list: '/kpis/dashboard',
                  meta: {
                    label: 'KPIs - Dashboard',
                  },
                },
                {
                  name: 'kpis_form',
                  list: '/kpis/form',
                  meta: {
                    label: 'KPIs - Preenchimento',
                  },
                },
                {
                  name: 'evolucao_rcp',
                  // list: '/evolucao_rcp',
                  edit: '/evolucao_rcp/edit/:id',
                  create: '/evolucao_rcp/create/:pacienteId',
                  meta: {
                    canDelete: true,
                    label: 'evolucao_rcp',
                  },
                },
              ]}
              options={{
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                title: {
                  text: 'Integra',
                  icon: <AcUnitIcon />,
                },
              }}
            >
              <AppRoutes />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}
