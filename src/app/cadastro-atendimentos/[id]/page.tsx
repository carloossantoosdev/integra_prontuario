/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from 'react';
import { AppointmentForm } from '@/components/AppointmentForm';
import { Box } from '@mui/material';
import { AppointmentData } from '@/types/appointment';
import { useAppointmentStore } from '@/store/appointments.store';

export default function EditarAtendimento({ params }: { params: { id: string } }) {
  const { appointmentList } = useAppointmentStore(); 
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({} as AppointmentData);

  useEffect(() => {
    const appointmentId = params.id; 

    if (appointmentId) {      
      // Busca o atendimento no store usando find
      const foundAppointment = appointmentList.find(appointment => appointment.id === appointmentId);

      if (foundAppointment) {
        setAppointmentData(foundAppointment); 
      } else {
        console.error("Atendimento não encontrado com o ID:", appointmentId);
      }
    }
  }, [params.id, appointmentList]);


  return (
    <Box>
      <AppointmentForm initialData={appointmentData} isEditMode={!!appointmentData} />
    </Box>
  );
}
