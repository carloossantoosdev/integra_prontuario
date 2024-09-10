/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from 'react';
import { Button, Box, Typography, CircularProgress, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { api } from '@/lib/axios';
import { Input } from './Input';
import { AppointmentData } from '@/types/appointment';
import { useRouter } from 'next/navigation';
import { IconArrowLeft } from '@/icons/IconArrowLeft';

type AppointmentFormProps = {
  initialData?: AppointmentData;  
  isEditMode?: boolean;   
};

export function AppointmentForm({
  initialData,
  isEditMode = false
}: AppointmentFormProps) {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<AppointmentData>({
    defaultValues: initialData ? { ...initialData, id: initialData.id || '' } : {} 
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach(key => {
        const typedKey = key as keyof AppointmentData;
        // Verifique se a chave é uma data e converta se necessário
        if (typedKey === "data_nascimento" || typedKey === "data_primeiro_atendimento" || typedKey === "data_ultimo_atendimento") {
            const dateValue = new Date(initialData[typedKey]);
            if (typedKey === "data_nascimento") {
                setValue(typedKey, dateValue.toISOString().split('T')[0]); 
            } else {
                setValue(typedKey, dateValue.toISOString().slice(0, 16));
            }
        } else {
            setValue(typedKey, initialData[typedKey]);
        }
      });
    }
  }, [initialData, setValue]);

  const onSubmit = async (data: AppointmentData) => {
    setLoading(true); 
    try {
      console.log('Dados do formulário:', data);
      let response;
      if (isEditMode) {
        response = await api.put(`/appointments/${data.id}`, data); 
        console.log('Resposta da API:', response.data);
      } else {
        response = await api.post('/appointments', data);
        console.log('Resposta da API:', response.data);
      }

      router.push('/'); 
    } catch (error) {
      const typedError = error as any;
      console.error('Erro ao chamar a API:', typedError.response?.data || typedError.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          <Button
            onClick={() => router.back()}
            sx={{
              p: 0,
            }}
          >
              <IconArrowLeft size={28} />
          </Button>
        {isEditMode ? 'Editar Atendimento' : 'Novo Atendimento'}
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '200px' }}>
          <Controller
            name="nome"
            control={control}
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

        <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '200px' }}>
          <Controller
            name="data_nascimento"
            control={control}
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

        <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '200px' }}>
          <Controller
            name="data_primeiro_atendimento"
            control={control}
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

        <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '200px' }}>
          <Controller
            name="data_ultimo_atendimento"
            control={control}
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

        <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '200px' }}>
          <Controller
            name="valor"
            control={control}
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


        <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '200px' }}>
          <Controller
            name="atendente"
            control={control}
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

        <Box sx={{ width: '100%' }}>
          <Controller
            name="observacoes"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Observações"
                multiline
                rows={4}
                sx={{ width: '100%' }}
              />
            )}
          />
        </Box>
      </Box>

      <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '200px' }}>
        <Controller
          name="condutas"
          control={control}
          rules={{ required: 'Este campo é obrigatório' }}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              rows={4}
              label="Condutas"
              error={!!errors.condutas}
              helperText={errors.condutas?.message}
              sx={{ width: '100%' }}
            />
          )}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button 
          type="submit" 
          variant="contained" 
          sx={{
            backgroundColor: '#05662B',
            textTransform: 'none',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#05662B',
            },
          }} 
          disabled={loading}
        >
            {loading ? <CircularProgress /> : (isEditMode ? 'Atualizar' : 'Enviar')} 
        </Button>
      </Box>
    </Box>
  );
}
