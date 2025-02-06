/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, TextField, Typography } from '@mui/material';
import { Edit, useAutocomplete } from '@refinedev/mui';
import { useForm } from '@refinedev/react-hook-form';

export const PacienteEdit = () => {
    const {
        saveButtonProps,
        refineCore: { query, formLoading },
        formState: { errors },
        register
    } = useForm({
        refineCoreProps: {
            meta: {
                select:
                    'nome, data_nascimento, inicio_atendimento, valor, fisioterapeuta, area_atendimento',
            },
        },
    });

    const patientsData = query?.data?.data;

    useAutocomplete({
        resource: 'pacientes',
        defaultValue: patientsData?.id,
    });

    const customSaveButtonProps = {
        ...saveButtonProps,
        children: 'Salvar',
    };

    const initialFields = [
        { name: "nome", type: "text", label: "Nome", required: true, defaultValue: patientsData?.nome },
        { name: "fisioterapeuta", type: "text", label: "Fisioterapeuta", required: true, defaultValue: patientsData?.fisioterapeuta },
        { name: "data_nascimento", type: "date", label: "Data de Nascimento", required: true, defaultValue: patientsData?.data_nascimento },
        { name: "inicio_atendimento", type: "date", label: "Início do Atendimento", required: true, defaultValue: patientsData?.inicio_atendimento },
        { name: "valor", type: "number", label: "Valor", required: true, defaultValue: patientsData?.valor },
        { name: "area_atendimento", type: "text", label: "Area de Atendimento", required: false, defaultValue: patientsData?.area_atendimento },
    ];

    return (
        <Edit isLoading={formLoading} saveButtonProps={customSaveButtonProps} title="Editar Evolução">
            <Box
                component="form"
                sx={{ display: 'flex', flexDirection: 'column' }}
                autoComplete="off"
            >
                <Typography variant="h6" fontWeight="bold">Dados do paciente</Typography>
                <Grid container spacing={2}>
                    {initialFields.map(({ name, type, label, required, defaultValue }) => (
                        <Grid item xs={6} key={name}>
                            <TextField
                                {...register(name, { required: required ? `${label} é obrigatório` : false })}
                                type={type}
                                error={!!errors[name]}
                                helperText={errors[name]?.message as string}
                                margin="normal"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                label={label}
                                defaultValue={defaultValue}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Edit>
    );
};
