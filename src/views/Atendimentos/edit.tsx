/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, TextField, Typography } from '@mui/material';
import { Edit, useAutocomplete } from '@refinedev/mui';
import { useForm } from '@refinedev/react-hook-form';

export const AppointmentsEdit = () => {
    const {
        saveButtonProps,
        refineCore: { query, formLoading },
        formState: { errors },
        register
    } = useForm({
        refineCoreProps: {
            meta: {
                select:
                    'nome, data_nascimento, inicio_atendimento, valor, fisioterapeuta, observacoes',
            },
        },
    });

    const patientsData = query?.data?.data;

    useAutocomplete({
        resource: 'patients',
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
        { name: "observacoes", type: "text", label: "Observações", required: false, defaultValue: patientsData?.observacoes },
    ];

    // const vitalSignsFields = [
    //     { name: "FC", required: true },
    //     { name: "SpO2", required: true },
    //     { name: "PA", required: true },
    //     { name: "Borg_D", required: true },
    //     { name: "Borg_F", required: true },
    //     { name: "EVA_Desc", required: true },
    // ];

    // const auscultaFields = [
    //     { name: 'mv', label: 'MV', options: ['presente', 'reduzido', 'abolido'] },
    //     { name: 'localizacao', label: 'Localização', options: ['AHT', 'base', 'ápice', 'direita', 'esquerda'] },
    //     { name: 'ruídos', label: 'Ruídos', options: ['roncos', 'estridor', 'espástica', 'estertores', 'sibilos expiratorios', 'sibilos inspiratorios'] },
    // ];

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

                {/* <Typography variant="h6" marginTop={2} fontWeight="bold">Sinais Vitais Inicial</Typography>
                <Grid container spacing={2}>
                    {vitalSignsFields.map(({ name }) => (
                        <Grid item xs={4} key={`ssvv_inicial.${name}`}>
                            <TextField
                                {...register(`ssvv_inicial.${name}`, { required: `${name} é obrigatório` })}
                                type={name === 'SpO2' || name === 'PA' ? 'text' : 'number'}
                                error={!!(errors.ssvv_inicial as any)?.[name]}
                                helperText={(errors.ssvv_inicial as any)?.[name]?.message}
                                margin="normal"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                label={name}
                            />
                        </Grid>
                    ))}
                </Grid>

                <Typography variant="h6" marginTop={2} fontWeight="bold">Sinais Vitais Final</Typography>
                <Grid container spacing={2}>
                    {vitalSignsFields.map(({ name }) => (
                        <Grid item xs={4} key={`ssvv_final.${name}`}>
                            <TextField
                                {...register(`ssvv_final.${name}`, { required: `${name} é obrigatório` })}
                                type={name === 'SpO2' || name === 'PA' ? 'text' : 'number'}
                                error={!!(errors.ssvv_final as any)?.[name]}
                                helperText={(errors.ssvv_final as any)?.[name]?.message}
                                margin="normal"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                label={name}
                            />
                        </Grid>
                    ))}
                </Grid>

                <Typography variant="h6" marginTop={2} fontWeight="bold">Ausculta Pulmonar</Typography>
                {auscultaFields.map(({ name, label, options }) => (
                    <div key={name}>
                        <Typography variant="subtitle1" fontWeight="bold">{label}</Typography>
                        {options.map(option => (
                            <FormControlLabel
                                key={option}
                                control={
                                    <Checkbox
                                        {...register(`ausculta_pulmonar.${name}.${option}`)}
                                        defaultChecked={appointmentsData?.ausculta_pulmonar?.[name]?.[option] || false}
                                        color="primary"
                                    />
                                }
                                label={option.charAt(0).toUpperCase() + option.slice(1)}
                            />
                        ))}
                    </div>
                ))} */}
            </Box>
        </Edit>
    );
};
