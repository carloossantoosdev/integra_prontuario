import { Box, TextField, Typography, Grid } from '@mui/material';
import { Create } from '@refinedev/mui';
import { useForm } from '@refinedev/react-hook-form';
import { useNavigate } from 'react-router-dom';
import { supabaseClient } from '../../utils/supabaseClient';

export const AppointmentsCreate = () => {
    const {
        saveButtonProps,
        refineCore: { formLoading },
        formState: { errors },
        register,
        getValues,
    } = useForm({});

    const navigate = useNavigate(); 

    const customSaveButtonProps = {
        ...saveButtonProps,
        children: 'Salvar', 
        onClick: async () => {
            const formData = getValues();

            const { data, error } = await supabaseClient
                .from('patients') 
                .insert([
                    {
                        nome: formData.nome,
                        data_nascimento: formData.data_nascimento,
                        inicio_atendimento: formData.inicio_atendimento,
                        valor: formData.valor,
                        fisioterapeuta: formData.fisioterapeuta,
                        observacoes: formData.observacoes,
                    },
                ]);

            if (error) {
                console.error('Erro ao enviar dados:', error);
            } else {
                console.log('Paciente cadastrado com sucesso:', data);
                navigate('/patients');
            }
        },
    };

    const initialFields = [
        { name: "nome", type: "text", label: "Nome Paciente", required: true },
        { name: "fisioterapeuta", type: "text", label: "Fisioterapeuta", required: true },
        { name: "data_nascimento", type: "date", label: "Data de Nascimento", required: true },
        { name: "inicio_atendimento", type: "date", label: "Início do Atendimento", required: true },
        { name: "valor", type: "number", label: "Valor", required: true },
        { name: "observacoes", type: "text", label: "Observações", required: false },
    ];

    return (
        <Create isLoading={formLoading} saveButtonProps={customSaveButtonProps} title="Criar Paciente">
            <Box
                component="form"
                sx={{ display: 'flex', flexDirection: 'column' }}
                autoComplete="off"
            >
                <Typography variant="h6" fontWeight="bold">Dados do paciente</Typography>
                <Grid container spacing={2}>
                    {initialFields.map(({ name, type, label, required }) => (
                        <Grid item xs={6} key={name}>
                            <TextField
                                {...register(name, { required: required ? `${label} é obrigatório` : false })}
                                required={name === 'observacoes' ? false : true}
                                type={type}
                                error={!!errors[name]}
                                helperText={errors[name]?.message as string}
                                margin="normal"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                label={label}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Create>
    );
};
