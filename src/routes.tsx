import React from 'react';
import { ThemedLayoutV2 } from '@refinedev/mui';
import { ErrorComponent } from '@refinedev/mui';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Header } from './components';
import {
	AppointmentsCreate,
	AppointmentsEdit,
	AppointmentsList,
	AppointmentsShow,
} from './views/Atendimentos';
import { Home } from './views/Home/home';
import { SinaisVitaisCreate } from './views/Atendimentos/SinaisVitaisCreate';
import SinaisVitaisList from './views/Atendimentos/SinaisVitaisList';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route
                element={
                    <ThemedLayoutV2 Header={Header}>
                        <Outlet />
                    </ThemedLayoutV2>
                }
            >
                <Route path="/" element={<Home />} />

                <Route path="/patients">
                    <Route index element={<AppointmentsList />} />
                    <Route path="create" element={<AppointmentsCreate />} />
                    <Route path="edit/:id" element={<AppointmentsEdit />} />
                    <Route path="show/:id" element={<AppointmentsShow />} />
                </Route>

                <Route path="/sinais_vitais/create/:pacienteId" element={<SinaisVitaisCreate />} />
                <Route path="/sinais_vitais" element={<SinaisVitaisList />} />

                <Route path="*" element={<ErrorComponent />} />
            </Route>
        </Routes>
    );
};
