"use client";

import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { AppointmentData } from '@/types/appointment';
import { useRouter } from 'next/navigation';
import { formatDate, formatTime } from '@/utils/formatedData';
import { formatCurrency } from '@/utils/formatedMoney';

export function AppointmentsList({ appointments }: { appointments: AppointmentData[] }) {
  const router = useRouter();

  const handleEdit = (id: string) => {
    if (id && id.trim() !== "") { 
      router.push(`/cadastro-atendimentos/${id}`);
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
              <TableCell>{formatDate(appointment.data_nascimento)}</TableCell>
              <TableCell>{formatDate(appointment.data_primeiro_atendimento)} {formatTime(appointment.data_primeiro_atendimento)}</TableCell>
              <TableCell>{formatDate(appointment.data_ultimo_atendimento)} {formatTime(appointment.data_ultimo_atendimento)}</TableCell>
              <TableCell>{formatCurrency(appointment.valor)}</TableCell>
              <TableCell>{appointment.condutas}</TableCell>
              <TableCell>{appointment.atendente}</TableCell>
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