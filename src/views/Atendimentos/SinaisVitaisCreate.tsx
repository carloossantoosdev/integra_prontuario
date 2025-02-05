import { Box, TextField, Typography, Grid, FormControlLabel, Checkbox } from '@mui/material';
import { Create } from '@refinedev/mui';
import { useForm } from '@refinedev/react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { supabaseClient } from '../../utils/supabaseClient';

export const SinaisVitaisCreate = () => {
    const { pacienteId } = useParams(); 
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
        children: 'Salvar Sinais Vitais', 
        onClick: async () => {
            const formData = getValues();

            const { data, error } = await supabaseClient
                .from('sinais_vitais') 
                .insert([
                    {
                        patient_id: pacienteId, 
                        ssvv_inicial: formData.ssvv_inicial,
                        ssvv_final: formData.ssvv_final,
                        ausculta_pulmonar: formData.ausculta_pulmonar,
                    },
                ]);

            if (error) {
                console.error('Erro ao cadastrar sinais vitais:', error);
            } else {
                console.log('Sinais vitais cadastrados com sucesso:', data);
                navigate('/patients'); 
            }
        },
    };

    const auscultaFields = [
        { name: 'mv', label: 'MV', options: ['presente', 'reduzido', 'abolido'] },
        { name: 'localizacao', label: 'Localização', options: ['AHT', 'base', 'Ápice', 'direita', 'esquerda'] },
        { name: 'ruídos', label: 'Ruídos', options: ['roncos', 'estridor', 'espástica', 'estertores', 'sibilos expiratorios', 'sibilos inspiratorios'] },
    ];

    return (
        <Create isLoading={formLoading} saveButtonProps={customSaveButtonProps} title="Cadastrar Sinais Vitais">
            <Box
                component="form"
                sx={{ display: 'flex', flexDirection: 'column' }}
                autoComplete="off"
            >
                <Grid container spacing={2}>

                    <Typography variant="h6" marginTop={2} fontWeight="bold">Sinais vitais inicial</Typography>
                    <Grid container spacing={2}>
                        {['FC', 'SpO2', 'PA', 'Borg_D', 'Borg_F', 'EVA_Desc'].map((fieldName) => (
                            <Grid item xs={4} key={`ssvv_inicial.${fieldName}`}>
                                <TextField
                                    {...register(`ssvv_inicial.${fieldName}`, { required: `${fieldName} é obrigatório` })}  
                                    required={true}
                                    type={fieldName === 'SpO2' || fieldName === 'PA' ? 'text' : 'number'}
                                    error={!!(errors.ssvv_inicial as any)?.[fieldName]} 
                                    helperText={(errors.ssvv_inicial as any)?.[fieldName]?.message} 
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    label={fieldName}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    {/* Dados Finais (ssvv_final) */}
                    <Typography variant="h6" marginTop={2} fontWeight="bold">Sinais vitais final</Typography>
                    <Grid container spacing={2}>
                        {['FC', 'SpO2', 'PA', 'Borg_D', 'Borg_F', 'EVA_Desc'].map((fieldName, index) => (
                            <Grid item xs={4} key={`ssvv_final.${fieldName}`}>
                                <TextField
                                    {...register(`ssvv_final.${fieldName}`, { required: `${fieldName} é obrigatório` })} 
                                    required={true}
                                    type={fieldName === 'SpO2' || fieldName === 'PA' ? 'text' : 'number'}
                                    error={!!(errors.ssvv_final as any)?.[fieldName]} 
                                    helperText={(errors.ssvv_final as any)?.[fieldName]?.message} 
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    label={fieldName}
                                />
                            </Grid>
                        ))}
                    </Grid> 

                    {auscultaFields.map(({ name, label, options }) => (
                        <div key={name}>
                            <Typography variant="subtitle1" fontWeight="bold">{label}</Typography>
                            {options.map(option => (
                                <FormControlLabel
                                    key={`ausculta_pulmonar.${name}.${option}`}
                                    control={
                                        <Checkbox
                                            {...register(`ausculta_pulmonar.${name}.${option}`)}
                                            color="primary"
                                        />
                                    }
                                    label={option.charAt(0).toUpperCase() + option.slice(1)}
                                />
                            ))}
                        </div>
                ))}
                    </Grid>
            </Box>
        </Create>
    );
};
