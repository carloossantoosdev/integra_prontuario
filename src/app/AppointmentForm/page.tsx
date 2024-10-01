"use client";

import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { api } from '@/lib/axios';
import { FormData } from '@/types/appointment';
import { Input } from '@/components/Input';

export function AppointmentForm() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      console.log('Dados do formulário:', data);
      const response = await api.post('/appointments', data);
      console.log('Resposta da API:', response.data);
    } catch (error) {
      console.error('Erro ao chamar a API:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Formulário de Atendimento
      </Typography>

      {/* Divisão flexível para os inputs */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {/* Input para Nome */}
        <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '200px' }}>
          <Controller
            name="nome"
            control={control}
            defaultValue=""
            rules={{ required: 'Este campo é obrigatório' }}
            render={({ field }) => (
              <Input
                {...field}
                label="Nome"
                error={!!errors.nome}
                helperText={errors.nome?.message}
                sx={{ width: '100%' }}
              />
            )}
          />
        </Box>

        {/* Input para Data de Nascimento */}
        <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '200px' }}>
          <Controller
            name="data_nascimento"
            control={control}
            defaultValue=""
            rules={{ required: 'Este campo é obrigatório' }}
            render={({ field }) => (
              <Input
                {...field}
                label="Data de Nascimento"
                type="date"
                error={!!errors.data_nascimento}
                helperText={errors.data_nascimento?.message}
                sx={{ width: '100%' }}
              />
            )}
          />
        </Box>

        {/* Input para Início do Atendimento */}
        <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '200px' }}>
          <Controller
            name="data_primeiro_atendimento"
            control={control}
            defaultValue=""
            rules={{ required: 'Este campo é obrigatório' }}
            render={({ field }) => (
              <Input
                {...field}
                label="Início do Atendimento"
                type="datetime-local"
                error={!!errors.data_primeiro_atendimento}
                helperText={errors.data_primeiro_atendimento?.message}
                sx={{ width: '100%' }}
              />
            )}
          />
        </Box>

        {/* Input para Data do Último Atendimento */}
        <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '200px' }}>
          <Controller
            name="data_ultimo_atendimento"
            control={control}
            defaultValue=""
            rules={{ required: 'Este campo é obrigatório' }}
            render={({ field }) => (
              <Input
                {...field}
                label="Data do Último Atendimento"
                type="datetime-local"
                error={!!errors.data_ultimo_atendimento}
                helperText={errors.data_ultimo_atendimento?.message}
                sx={{ width: '100%' }}
              />
            )}
          />
        </Box>

        {/* Input para Valor */}
        <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '200px' }}>
          <Controller
            name="valor"
            control={control}
            defaultValue={0}
            rules={{ required: 'Este campo é obrigatório' }}
            render={({ field }) => (
              <Input
                {...field}
                label="Valor"
                type="number"
                error={!!errors.valor}
                helperText={errors.valor?.message}
                sx={{ width: '100%' }}
              />
            )}
          />
        </Box>

        {/* Input para Condutas */}
        <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '200px' }}>
          <Controller
            name="condutas"
            control={control}
            defaultValue=""
            rules={{ required: 'Este campo é obrigatório' }}
            render={({ field }) => (
              <Input
                {...field}
                label="Condutas"
                error={!!errors.condutas}
                helperText={errors.condutas?.message}
                sx={{ width: '100%' }}
              />
            )}
          />
        </Box>

        {/* Input para Observações */}
        <Box sx={{ width: '100%' }}>
          <Controller
            name="observacoes"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                label="Observações"
                sx={{ width: '100%' }}
              />
            )}
          />
        </Box>

        {/* Input para Atendente */}
        <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '200px' }}>
          <Controller
            name="atendente"
            control={control}
            defaultValue=""
            rules={{ required: 'Este campo é obrigatório' }}
            render={({ field }) => (
              <Input
                {...field}
                label="Atendente"
                error={!!errors.atendente}
                helperText={errors.atendente?.message}
                sx={{ width: '100%' }}
              />
            )}
          />
        </Box>
      </Box>

      {/* Alinhamento do botão à direita */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">Enviar</Button>
      </Box>
    </Box>
  );
}
