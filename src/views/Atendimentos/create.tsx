import { Box, TextField, Typography } from '@mui/material';
import { Create, useAutocomplete } from '@refinedev/mui';
import { useForm } from '@refinedev/react-hook-form';
import { Controller } from 'react-hook-form';

export const AppointmentsCreate = () => {
	const {
		saveButtonProps,
		refineCore: { formLoading },
		formState: { errors },
		control,
	} = useForm({});

	useAutocomplete({
		resource: 'appointments',
	});

	const customSaveButtonProps = {
		...saveButtonProps,
		children: 'Salvar', 
	};

	
    const initialFields = [
        { name: "nome", type: "text", label: "Nome", required: true },
        { name: "data_nascimento", type: "date", label: "Data de Nascimento", required: true },
        { name: "inicio_atendimento", type: "date", label: "Início do Atendimento", required: true },
        { name: "valor", type: "number", label: "Valor", required: true },
        { name: "fisioterapeuta", type: "text", label: "Fisioterapeuta", required: true },
        { name: "observacoes", type: "text", label: "Observações", required: false },
    ];

    return (
        <Create isLoading={formLoading} saveButtonProps={customSaveButtonProps} title="Criar Evolução">
            <Box
                component="form"
                sx={{ display: 'flex', flexDirection: 'column' }}
                autoComplete="off"
            >
                <Typography variant="h6" fontWeight="bold">Dados do paciente</Typography>

                {initialFields.map(({ name, type, label, required }) => (
                    <Controller
                        key={name}
                        name={name}
                        control={control}
                        defaultValue=""
                        rules={required ? { required: `${label} é obrigatório` } : {}}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type={type}
                                error={!!errors[name]}
                                helperText={errors[name]?.message as string}
                                margin="normal"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                label={label}
                            />
                        )}
                    />
                ))}

                {/* Dados Iniciais (ssvv_inicial) */}
                <Typography variant="h6" marginTop={2} fontWeight="bold">Sinais vitais inicial</Typography>

                {['FC', 'SpO2', 'PA', 'Borg_D', 'Borg_F', 'EVA_Desc'].map(fieldName => (
                    <Controller
                        key={`ssvv_inicial.${fieldName}`}
                        name={`ssvv_inicial.${fieldName}`}
                        control={control}
                        defaultValue=""
                        rules={{ required: `${fieldName} é obrigatório` }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type={fieldName === 'SpO2' || fieldName === 'PA' ? 'text' : 'number'}
                                error={!!(errors.ssvv_inicial as any)?.[fieldName]} 
                                helperText={(errors.ssvv_inicial as any)?.[fieldName]?.message} 
                                margin="normal"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                label={fieldName}
                            />
                        )}
                    />
                ))}

                {/* Dados Finais (ssvv_final) */}
                <Typography variant="h6" marginTop={2} fontWeight="bold">Sinais vitais final</Typography>

                {['FC', 'SpO2', 'PA', 'Borg_D', 'Borg_F', 'EVA_Desc'].map(fieldName => (
                    <Controller
                        key={`ssvv_final.${fieldName}`} 
                        name={`ssvv_final.${fieldName}`}
                        control={control}
                        defaultValue=""
                        rules={{ required: `${fieldName} é obrigatório` }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type={fieldName === 'SpO2' || fieldName === 'PA' ? 'text' : 'number'}
                                error={!!(errors.ssvv_final as any)?.[fieldName]} 
                                helperText={(errors.ssvv_final as any)?.[fieldName]?.message} 
                                margin="normal"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                label={fieldName}
                            />
                        )}
                    />
                ))}
            </Box>
        </Create>
    );
};