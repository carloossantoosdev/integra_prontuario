"use client";

import React, { Suspense } from 'react';
import { AppointmentForm as AppointmentFormComponent } from '@/components/AppointmentForm';

export default function AppointmentFormPage() {
  return (
    <Suspense fallback={null}>
      <AppointmentFormComponent />
    </Suspense>
  );
}
