import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { ThemedLayoutV2 } from "@refinedev/mui";
import { ErrorComponent } from "@refinedev/mui";
import { Header } from "./components";
import { Home } from "./views/Home/home";
import { AppointmentsCreate, AppointmentsEdit, AppointmentsList, AppointmentsShow } from "./views/Atendimentos";

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

        <Route path="/appointments">
          <Route index element={<AppointmentsList />} />
          <Route path="create" element={<AppointmentsCreate />} />
          <Route path="edit/:id" element={<AppointmentsEdit />} />
          <Route path="show/:id" element={<AppointmentsShow />} />
        </Route>

        <Route path="*" element={<ErrorComponent />} />
      </Route>
    </Routes>
  );
};

