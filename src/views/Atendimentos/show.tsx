import {
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
    CircularProgress,
} from '@mui/material';
import { useShow } from '@refinedev/core';
import { DateField, Show, EditButton, DeleteButton } from '@refinedev/mui';
import { useEffect, useState } from 'react';
import { supabaseClient } from '../../utils/supabaseClient';
import { AuscultaPulmonar, Ssvv, VitalSigns } from '../../types/types';

export const AppointmentsShow = () => {
    const [vitalsData, setVitalsData] = useState<VitalSigns[]>([]);
    const [loadingVitals, setLoadingVitals] = useState(true);

    // Obtém os dados do paciente
    const { query } = useShow({
        meta: {
            select: 'id, nome, data_nascimento, inicio_atendimento, valor, observacoes, fisioterapeuta',
        },
    });

    const { data, isLoading } = query;
    const record = data?.data;

    useEffect(() => {
        const fetchVitals = async () => {
            if (record) {
                setLoadingVitals(true);
                const { data: vitals, error } = await supabaseClient
                    .from('sinais_vitais')
                    .select('*')
                    .eq('patient_id', record.id);
        
                if (error) {
                    console.error('Erro ao buscar sinais vitais:', error);
                } else {
                    // Ordenar os dados para ter o mais recente primeiro
                    setVitalsData(vitals.sort((a: VitalSigns, b: VitalSigns) => Number(new Date(b.created_at)) - Number(new Date(a.created_at))));
                }
                setLoadingVitals(false);
            }
        };
        

        fetchVitals();
    }, [record]);

    if (isLoading || loadingVitals) {
        return <CircularProgress />;
    }

    const renderDataTable = (data: Ssvv) => {
        if (!data) {
            return (
                <TableRow>
                    <TableCell colSpan={2}>Sem dados</TableCell>
                </TableRow>
            );
        }

        return Object.entries(data).map(([key, value]) => (
            <TableRow key={key}>
                <TableCell style={{ fontWeight: 600 }}>{key}</TableCell>
                <TableCell>{value}</TableCell>
            </TableRow>
        ));
    };

    // Função para renderizar os dados de ausculta pulmonar
    const renderAuscultaPulmonar = (ausculta: AuscultaPulmonar, vital: VitalSigns) => {
        if (!ausculta) return null;

        return (
            <>
                <Typography variant="h6" fontWeight="bold" marginTop={1}>
                    Ausculta Pulmonar - {new Date(vital.created_at).toLocaleDateString('pt-BR')}
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {Object.entries(ausculta).map(([key, value]) => (
                                <TableRow key={key}>
                                    <TableCell style={{ fontWeight: 600 }}>{key}</TableCell>
                                    <TableCell>
                                        {typeof value === 'object'
                                            ? Object.entries(value)
                                                  .filter(([, val]) => val === true)
                                                  .map(([subKey]) => subKey)
                                                  .join(', ') || 'Nenhum'
                                            : value}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    };

    return (
        <Show 
            isLoading={isLoading} 
            title="Detalhes Evolução" 
            canEdit
            canDelete
            headerButtons={[
                <EditButton recordItemId={record?.id}>
                    Editar
                </EditButton>,
                <DeleteButton 
                    recordItemId={record?.id} 
                    confirmTitle="Deseja excluir este item?" 
                    confirmCancelText='Cancelar'
                    confirmOkText='Excluir'
                >
                    Excluir
                </DeleteButton>
            ]}
        >
            <Stack gap={2}>
                <Typography variant="h6" fontWeight="bold" marginTop={2}>
                    Dados Pessoais do Paciente
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{ fontWeight: 600 }}>Nome</TableCell>
                                <TableCell>{record?.nome}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ fontWeight: 600 }}>Data de Nascimento</TableCell>
                                <TableCell>
                                    <DateField value={record?.data_nascimento} />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ fontWeight: 600 }}>Início do Atendimento</TableCell>
                                <TableCell>
                                    <DateField value={record?.inicio_atendimento} />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ fontWeight: 600 }}>Valor</TableCell>
                                <TableCell>
                                    {
                                        record?.valor
                                            ? `R$ ${record?.valor.toLocaleString('pt-BR', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })}`
                                            : 'R$ 0,00'
                                    }
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ fontWeight: 600 }}>Fisioterapeuta</TableCell>
                                <TableCell>{record?.fisioterapeuta}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ fontWeight: 600 }}>Observações</TableCell>
                                <TableCell>{record?.observacoes}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                {vitalsData.map((vital, index) => (
                    <div key={vital.id} style={{ marginBottom: '20px' }}>
                        <Typography variant="h6" fontWeight="bold" marginTop={2}>
                            Sinais vitais inicial - {new Date(vital.created_at).toLocaleDateString('pt-BR')}
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>{renderDataTable(vital.ssvv_inicial)}</TableBody>
                            </Table>
                        </TableContainer>

                        <Typography variant="h6" fontWeight="bold" marginTop={2}>
                            Sinais vitais final - {new Date(vital.created_at).toLocaleDateString('pt-BR')}
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>{renderDataTable(vital.ssvv_final)}</TableBody>
                            </Table>
                        </TableContainer>

                        {/* Renderizando Ausculta Pulmonar */}
                        {renderAuscultaPulmonar(vital.ausculta_pulmonar, vital)}

                        {index < vitalsData.length - 1 && <hr style={{ margin: '40px 0' }} />}
                    </div>
                ))}

            </Stack>
        </Show>
    );
};
