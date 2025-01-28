import { Refine } from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';

import { RefineSnackbarProvider, notificationProvider } from '@refinedev/mui';

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
							notificationProvider={notificationProvider}
							resources={[
								{
									name: 'appointments',
									list: '/appointments',
									create: '/appointments/create',
									edit: '/appointments/edit/:id',
									show: '/appointments/show/:id',
									meta: {
										canDelete: true,
										label: 'Evolução de RCP',
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
