/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, TextField, Typography } from '@mui/material';
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
					'nome, data_nascimento, inicio_atendimento, valor, fisioterapeuta, observacoes, ssvv_inicial, ssvv_final',
			},
		},
	});

	const appointmentsData = query?.data?.data;

	useAutocomplete({
		resource: 'appointments',
		defaultValue: appointmentsData?.id,
	});

	const customSaveButtonProps = {
		...saveButtonProps,
		children: 'Salvar',
	};

	const initialFields = [
		{ name: "nome", type: "text", label: "Nome", required: true, defaultValue: appointmentsData?.nome },
		{ name: "data_nascimento", type: "date", label: "Data de Nascimento", required: true, defaultValue: appointmentsData?.data_nascimento },
		{ name: "inicio_atendimento", type: "date", label: "Início do Atendimento", required: true, defaultValue: appointmentsData?.inicio_atendimento },
		{ name: "valor", type: "number", label: "Valor", required: true, defaultValue: appointmentsData?.valor },
		{ name: "fisioterapeuta", type: "text", label: "Fisioterapeuta", required: true, defaultValue: appointmentsData?.fisioterapeuta },
		{ name: "observacoes", type: "text", label: "Observações", required: false, defaultValue: appointmentsData?.observacoes },
	];

	const vitalSignsFields = [
		{ name: "FC", required: true },
		{ name: "SpO2", required: true },
		{ name: "PA", required: true },
		{ name: "Borg_D", required: true },
		{ name: "Borg_F", required: true },
		{ name: "EVA_Desc", required: true },
	];

	return (
		<Edit isLoading={formLoading} saveButtonProps={customSaveButtonProps} title="Editar Evolução">
			<Box
				component="form"
				sx={{ display: 'flex', flexDirection: 'column' }}
				autoComplete="off"
			>
				<Typography variant="h6" fontWeight="bold">Dados do paciente</Typography>

				{initialFields.map(({ name, type, label, required }) => (
							<TextField
								key={name}
								{...register(name, { required: required ? `${label} é obrigatório` : false })}
								type={type}
								error={!!errors[name]}
								helperText={errors[name]?.message as string}
								margin="normal"
								fullWidth
								InputLabelProps={{ shrink: true }}
								label={label}
							/>
				))}

				<Typography variant="h6" marginTop={2} fontWeight="bold">Sinais vitais inicial</Typography>

				{vitalSignsFields.map(({ name }) => (
					
							<TextField
								key={`ssvv_inicial.${name}`}
								{...register(`ssvv_inicial.${name}`, { required: `${name} é obrigatório` })}
								type={name === 'SpO2' || name === 'PA' ? 'text' : 'number'}
								error={!!(errors.ssvv_inicial as any)?.[name]}
								helperText={(errors.ssvv_inicial as any)?.[name]?.message}
								margin="normal"
								fullWidth
								InputLabelProps={{ shrink: true }}
								label={name}
							/>
				))}

				<Typography variant="h6" marginTop={2} fontWeight="bold">Sinais vitais final</Typography>

				{vitalSignsFields.map(({ name }) => (
							<TextField
								key={`ssvv_final.${name}`}
								{...register(`ssvv_final.${name}`, { required: `${name} é obrigatório` })}
								type={name === 'SpO2' || name === 'PA' ? 'text' : 'number'}
								error={!!(errors.ssvv_final as any)?.[name]}
								helperText={(errors.ssvv_final as any)?.[name]?.message}
								margin="normal"
								fullWidth
								InputLabelProps={{ shrink: true }}
								label={name}
							/>
				))}
			</Box>
		</Edit>
	);
};
