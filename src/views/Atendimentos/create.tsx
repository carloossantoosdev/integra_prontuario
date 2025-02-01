import { Box, TextField, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { Create, useAutocomplete } from '@refinedev/mui';
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

    useAutocomplete({
        resource: 'appointments',
    });

    const customSaveButtonProps = {
        ...saveButtonProps,
        children: 'Salvar', 
        onClick: async () => {
            const formData = getValues();

            const auscultaData = {
                mv: {
                    presente: formData.mv?.presente || false,
                    reduzido: formData.mv?.reduzido || false,
                    abolido: formData.mv?.abolido || false,
                },
                localizacao: {
                    aht: formData.localizacao?.aht || false,
                    direita: formData.localizacao?.direita || false,
                    esquerda: formData.localizacao?.esquerda || false,
                    apice: formData.localizacao?.apice || false,
                    base: formData.localizacao?.base || false,
                },
                ruídos: {
                    roncos: formData.ruidos?.roncos || false,
                    sibilos_inspiratorios: formData.ruidos?.sibilos_inspiratorios || false,
                    sibilos_expiratorios: formData.ruidos?.sibilos_expiratorios || false,
                    espastica: formData.ruidos?.espastica || false,
                    estertores: formData.ruidos?.estertores || false,
                    estridor: formData.ruidos?.estridor || false,
                },
            };
            
            const { data, error } = await supabaseClient
                .from('appointments') 
                .insert([
                    {
                        nome: formData.nome,
                        data_nascimento: formData.data_nascimento,
                        inicio_atendimento: formData.inicio_atendimento,
                        valor: formData.valor,
                        fisioterapeuta: formData.fisioterapeuta,
                        observacoes: formData.observacoes,
                        ssvv_inicial: {
                            FC: formData.ssvv_inicial.FC,
                            SpO2: formData.ssvv_inicial.SpO2,
                            PA: formData.ssvv_inicial.PA,
                            Borg_D: formData.ssvv_inicial.Borg_D,
                            Borg_F: formData.ssvv_inicial.Borg_F,
                            EVA_Desc: formData.ssvv_inicial.EVA_Desc,
                        },
                        ssvv_final: {
                            FC: formData.ssvv_final.FC,
                            SpO2: formData.ssvv_final.SpO2,
                            PA: formData.ssvv_final.PA,
                            Borg_D: formData.ssvv_final.Borg_D,
                            Borg_F: formData.ssvv_final.Borg_F,
                            EVA_Desc: formData.ssvv_final.EVA_Desc,
                        },
                        ausculta_pulmonar: auscultaData,
                    },
                ]);

            if (error) {
                console.error('Erro ao enviar dados:', error);
            } else {
                console.log('Dados enviados com sucesso:', data);
                navigate('/appointments');
            }
        },
    };

    const initialFields = [
        { name: "nome", type: "text", label: "Nome", required: true },
        { name: "data_nascimento", type: "date", label: "Data de Nascimento", required: true },
        { name: "inicio_atendimento", type: "date", label: "Início do Atendimento", required: true },
        { name: "valor", type: "number", label: "Valor", required: true },
        { name: "fisioterapeuta", type: "text", label: "Fisioterapeuta", required: true },
        { name: "observacoes", type: "text", label: "Observações", required: false },
    ];

    const auscultaFields = [
        { name: 'mv', label: 'MV', options: ['presente', 'reduzido', 'abolido'] },
        { name: 'ruídos', label: 'Ruídos', options: ['roncos', 'estridor', 'espastica', 'estertores', 'sibilos_expiratorios', 'sibilos_inspiratorios'] },
        { name: 'localizacao', label: 'Localização', options: ['aht', 'base', 'apice', 'direita', 'esquerda'] },
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
                    <TextField
                        key={name}
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
                ))}

                {/* Dados Iniciais (ssvv_inicial) */}
                <Typography variant="h6" marginTop={2} fontWeight="bold">Sinais vitais inicial</Typography>
                {['FC', 'SpO2', 'PA', 'Borg_D', 'Borg_F', 'EVA_Desc'].map(fieldName => (
                    <TextField
                        {...register(`ssvv_inicial.${fieldName}`, { required: `${fieldName} é obrigatório` })}  
                        key={`ssvv_inicial.${fieldName}`}
                        required={true}
                        type={fieldName === 'SpO2' || fieldName === 'PA' ? 'text' : 'number'}
                        error={!!(errors.ssvv_inicial as any)?.[fieldName]} 
                        helperText={(errors.ssvv_inicial as any)?.[fieldName]?.message} 
                        margin="normal"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        label={fieldName}
                    />
                ))}

                {/* Dados Finais (ssvv_final) */}
                <Typography variant="h6" marginTop={2} fontWeight="bold">Sinais vitais final</Typography>
                {['FC', 'SpO2', 'PA', 'Borg_D', 'Borg_F', 'EVA_Desc'].map(fieldName => (
                    <TextField
                        {...register(`ssvv_final.${fieldName}`, { required: `${fieldName} é obrigatório` })} 
                        key={`ssvv_final.${fieldName}`} 
                        required={true}
                        type={fieldName === 'SpO2' || fieldName === 'PA' ? 'text' : 'number'}
                        error={!!(errors.ssvv_final as any)?.[fieldName]} 
                        helperText={(errors.ssvv_final as any)?.[fieldName]?.message} 
                        margin="normal"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        label={fieldName}
                    />
                ))} 

                {/* Título da Ausculta Pulmonar */}
                <Typography variant="h6" marginTop={2} fontWeight="bold">Ausculta Pulmonar</Typography>

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
            </Box>
        </Create>
    );
};
