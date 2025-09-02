"use client";

import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { AppointmentData } from '@/types/appointment';
import { formatDate } from '@/utils/formatedData';

interface AppointmentsListProps {
  appointments: AppointmentData[];
  onEdit: (id: string) => void; // Adicionar a prop onEdit
}

export function AppointmentsList({ appointments, onEdit }: AppointmentsListProps) {
  const handleEdit = (id: number | undefined) => {
    if (id !== undefined && id !== null) {
      onEdit(id.toString()); // Converter o ID para string antes de chamar onEdit
    } else {
      console.error('ID inválido:', id);
    }
  };

  return (
      <Table>
        <TableHead>
          <TableRow >
            <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Data de Nascimento</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Início do Atendimento</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Último Atendimento</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Valor</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Condutas</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Atendente</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.nome}</TableCell>
              <TableCell>{formatDate(appointment.data_atendimento)} {formatDate(appointment.data_atendimento)}</TableCell>
              {/* <TableCell>{formatDate(appointment.data_primeiro_atendimento)} {formatTime(appointment.data_primeiro_atendimento)}</TableCell>
              <TableCell>{formatDate(appointment.data_ultimo_atendimento)} {formatTime(appointment.data_ultimo_atendimento)}</TableCell>
              <TableCell>
                        {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }).format(Number(appointment.valor))}
              </TableCell>
              <TableCell>{appointment.condutas}</TableCell>
              <TableCell>{appointment.atendente}</TableCell> */}
              <TableCell>
                <Button 
                  variant="contained" 
                  sx={{
                    backgroundColor: '#05662B',
                    textTransform: 'none',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#05662B',
                    },
                  }} 
                  onClick={() => appointment.id && handleEdit(appointment.id)}>
                    Editar
                  </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );
}