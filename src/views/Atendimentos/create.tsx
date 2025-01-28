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

	return (
		<Create isLoading={formLoading} saveButtonProps={customSaveButtonProps} title="Criar Evolução">
			<Box
				component="form"
				sx={{ display: 'flex', flexDirection: 'column' }}
				autoComplete="off"
			>
				<Typography variant="h6" fontWeight="bold">
					Dados do paciente
				</Typography>
				<Controller
					name="nome"
					control={control}
					defaultValue=""
					rules={{ required: 'Este campo é obrigatório' }}
					render={({ field }) => (
						<TextField
							{...field}
							error={!!errors.nome}
							helperText={errors.nome?.message as string}
							margin="normal"
							fullWidth
							InputLabelProps={{ shrink: true }}
							type="text"
							label={'Nome'}
						/>
					)}
				/>

				<Controller
					name="data_nascimento"
					control={control}
					defaultValue=""
					rules={{ required: 'Este campo é obrigatório' }}
					render={({ field }) => (
						<TextField
							{...field}
							type="date"
							error={!!errors.data_nascimento}
							helperText={errors.data_nascimento?.message as string}
							margin="normal"
							fullWidth
							InputLabelProps={{ shrink: true }}
							label={'Data de Nascimento'}
						/>
					)}
				/>

				<Controller
					name="inicio_atendimento"
					control={control}
					defaultValue=""
					rules={{ required: 'Este campo é obrigatório' }}
					render={({ field }) => (
						<TextField
							{...field}
							type="date"
							error={!!errors.inicio_atendimento}
							helperText={errors.inicio_atendimento?.message as string}
							margin="normal"
							fullWidth
							InputLabelProps={{ shrink: true }}
							label={'Início do Atendimento'}
						/>
					)}
				/>

				<Controller
					name="valor"
					control={control}
					defaultValue=""
					rules={{ required: 'Este campo é obrigatório' }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							error={!!errors.valor}
							helperText={errors.valor?.message as string}
							margin="normal"
							fullWidth
							InputLabelProps={{ shrink: true }}
							label={'Valor'}
						/>
					)}
				/>

				<Controller
					name="fisioterapeuta"
					control={control}
					defaultValue=""
					rules={{ required: 'Este campo é obrigatório' }}
					render={({ field }) => (
						<TextField
							{...field}
							type="text"
							error={!!errors.fisioterapeuta}
							helperText={errors.fisioterapeuta?.message as string}
							margin="normal"
							fullWidth
							InputLabelProps={{ shrink: true }}
							label={'Fisioterapeuta'}
						/>
					)}
				/>

				<Controller
					name="observacoes"
					control={control}
					defaultValue=""
					render={({ field }) => (
						<TextField
							{...field}
							type="text"
							error={!!errors.observacoes}
							helperText={errors.observacoes?.message as string}
							margin="normal"
							fullWidth
							InputLabelProps={{ shrink: true }}
							label={'Observações'}
						/>
					)}
				/>

				{/* Dados Iniciais (ssvv_inicial) */}
				<Typography variant="h6" marginTop={2} fontWeight="bold">
					Sinais vitais iniciais
				</Typography>
				<Controller
					name="ssvv_inicial.FC"
					control={control}
					defaultValue=""
					rules={{ required: 'FC é obrigatório' }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							error={!!errors['ssvv_inicial.FC']}
							helperText={errors['ssvv_inicial.FC']?.message as string}
							margin="normal"
							fullWidth
							InputLabelProps={{ shrink: true }}
							label={'FC'}
						/>
					)}
				/>
				<Controller
					name="ssvv_inicial.SpO2"
					control={control}
					defaultValue=""
					rules={{ required: 'SpO2 é obrigatório' }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							error={!!errors['ssvv_inicial.SpO2']}
							helperText={errors['ssvv_inicial.SpO2']?.message as string}
							margin="normal"
							fullWidth
							InputLabelProps={{ shrink: true }}
							label={'SpO2'}
						/>
					)}
				/>
				<Controller
					name="ssvv_inicial.PA"
					control={control}
					defaultValue=""
					rules={{ required: 'PA é obrigatório' }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							error={!!errors['ssvv_inicial.PA']}
							helperText={errors['ssvv_inicial.PA']?.message as string}
							margin="normal"
							fullWidth
							InputLabelProps={{ shrink: true }}
							label={'PA'}
						/>
					)}
				/>
				<Controller
					name="ssvv_inicial.Borg_D"
					control={control}
					defaultValue=""
					rules={{ required: 'Borg D é obrigatório' }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							error={!!errors['ssvv_inicial.Borg_D']}
							helperText={errors['ssvv_inicial.Borg_D']?.message as string}
							margin="normal"
							fullWidth
							InputLabelProps={{ shrink: true }}
							label={'Borg D'}
						/>
					)}
				/>
				<Controller
					name="ssvv_inicial.Borg_F"
					control={control}
					defaultValue=""
					rules={{ required: 'Borg F é obrigatório' }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							error={!!errors['ssvv_inicial.Borg_F']}
							helperText={errors['ssvv_inicial.Borg_F']?.message as string}
							margin="normal"
							fullWidth
							InputLabelProps={{ shrink: true }}
							label={'Borg F'}
						/>
					)}
				/>
				<Controller
					name="ssvv_inicial.EVA_Desc"
					control={control}
					defaultValue=""
					rules={{ required: 'Descrição EVA é obrigatória' }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							error={!!errors['ssvv_inicial.EVA_Desc']}
							helperText={errors['ssvv_inicial.EVA_Desc']?.message as string}
							margin="normal"
							fullWidth
							InputLabelProps={{ shrink: true }}
							label={'EVA Desc.'}
						/>
					)}
				/>

				{/* Dados Finais (ssvv_final) */}
				<Typography variant="h6" marginTop={2} fontWeight="bold">
					Sinais vitais finais
				</Typography>
				<Controller
					name="ssvv_final.FC"
					control={control}
					defaultValue=""
					rules={{ required: 'FC é obrigatório' }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							error={!!errors['ssvv_final.FC']}
							helperText={errors['ssvv_final.FC']?.message as string}
							margin="normal"
							fullWidth
							InputLabelProps={{ shrink: true }}
							label={'FC'}
						/>
					)}
				/>
				<Controller
					name="ssvv_final.SpO2"
					control={control}
					defaultValue=""
					rules={{ required: 'SpO2 é obrigatório' }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							error={!!errors['ssvv_final.SpO2']}
							helperText={errors['ssvv_final.SpO2']?.message as string}
							margin="normal"
							fullWidth
							InputLabelProps={{ shrink: true }}
							label={'SpO2'}
						/>
					)}
				/>
				<Controller
					name="ssvv_final.PA"
					control={control}
					defaultValue=""
					rules={{ required: 'PA é obrigatório' }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							error={!!errors['ssvv_final.PA']}
							helperText={errors['ssvv_final.PA']?.message as string}
							margin="normal"
							fullWidth
							InputLabelProps={{ shrink: true }}
							label={'PA'}
						/>
					)}
				/>
				<Controller
					name="ssvv_final.Borg_D"
					control={control}
					defaultValue=""
					rules={{ required: 'Borg D é obrigatório' }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							error={!!errors['ssvv_final.Borg_D']}
							helperText={errors['ssvv_final.Borg_D']?.message as string}
							margin="normal"
							fullWidth
							InputLabelProps={{ shrink: true }}
							label={'Borg D'}
						/>
					)}
				/>
				<Controller
					name="ssvv_final.Borg_F"
					control={control}
					defaultValue=""
					rules={{ required: 'Borg F é obrigatório' }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							error={!!errors['ssvv_final.Borg_F']}
							helperText={errors['ssvv_final.Borg_F']?.message as string}
							margin="normal"
							fullWidth
							InputLabelProps={{ shrink: true }}
							label={'Borg F'}
						/>
					)}
				/>
				<Controller
					name="ssvv_final.EVA_Desc"
					control={control}
					defaultValue=""
					rules={{ required: 'Descrição EVA é obrigatória' }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							error={!!errors['ssvv_final.EVA_Desc']}
							helperText={errors['ssvv_final.EVA_Desc']?.message as string}
							margin="normal"
							fullWidth
							InputLabelProps={{ shrink: true }}
							label={'EVA Desc.'}
						/>
					)}
				/>
			</Box>
		</Create>
	);
};
