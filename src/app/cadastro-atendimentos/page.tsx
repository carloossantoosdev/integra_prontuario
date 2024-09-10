"use client";

import React from 'react';
import { AppointmentForm } from '@/components/AppointmentForm';
import { Box } from '@mui/material';

export default function CadastroAtendimento() {
  return (
    <Box>
      <AppointmentForm isEditMode={false} /> 
    </Box>
  );
}
