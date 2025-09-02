"use client";

import React, { Suspense } from 'react';
import { Box } from '@mui/material';
import { AppointmentForm } from '@/components/AppointmentForm';

export default function CadastroAtendimento() {
  return (
    <Suspense fallback={null}>
      <Box>
        <AppointmentForm /> 
      </Box>
    </Suspense>
  );
}
