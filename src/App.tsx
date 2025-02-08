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
import { dataProvider, liveProvider } from '@refinedev/supabase';
import { BrowserRouter } from 'react-router-dom';
import { ColorModeContextProvider } from './contexts/color-mode';
import { AppRoutes } from './routes';
import { supabaseClient } from './utils/supabaseClient';

export function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider(supabaseClient)}
              liveProvider={liveProvider(supabaseClient)}
              routerProvider={routerBindings}
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
                {
                  name: 'evolucao_rcp',
                  // list: '/evolucao_rcp',
                  create: '/evolucao_rcp/create/:pacienteId',
                  meta: {
                    canDelete: true,
                    label: 'evolucao_rcp',
                  },
                },
              ]}
              options={{
                // syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                title: {
                  text: 'Integra',
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
