/* eslint-disable no-mixed-spaces-and-tabs */
import {
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from '@mui/material';
import { useShow } from '@refinedev/core';
import { DateField, Show, EditButton, DeleteButton } from '@refinedev/mui';

export const AppointmentsShow = () => {
    const { query } = useShow({
        meta: {
            select:
                'nome, data_nascimento, inicio_atendimento, valor, observacoes, fisioterapeuta, ssvv_inicial, ssvv_final, ausculta_pulmonar',
        },
    });

    const { data, isLoading } = query;

    const record = data?.data;

    const renderDataTable = (data: Record<string, unknown> | null) => {
        if (!data)
            return (
                <TableRow>
                    <TableCell colSpan={2}>Sem dados</TableCell>
                </TableRow>
            );

        const rows = Object.entries(data).map(([key, value]) => (
            <TableRow key={key}>
                <TableCell
                    style={{
                        fontWeight: 600,
                    }}
                >
                    {key}
                </TableCell>
                <TableCell>{value as React.ReactNode}</TableCell>
            </TableRow>
        ));

        return rows;
    };

    const renderAuscultaPulmonar = (ausculta: Record<string, unknown> | null) => {
        if (!ausculta) return null;

        // Filtrar os dados para mostrar apenas os que são true
        const filteredData = Object.entries(ausculta)
            .map(([key, value]) => {
                // Verifica se o valor é um objeto e filtra para mostrar apenas os true
                if (typeof value === 'object') {
                    const filteredValues = Object.entries(value || {})
                        .filter(([, val]) => val === true)
                        .map(([subKey]) => subKey); // Retorna apenas as chaves

                    return {
                        key,
                        values: filteredValues,
                    };
                }

                return null;
            })
            .filter(item => item); // Remove itens que são null

        if (filteredData.length === 0) return null;

        return (
            <>
                <Typography variant="subtitle1" fontWeight="bold" marginTop={1}>
                    Ausculta Pulmonar
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {filteredData.filter((item): item is { key: string; values: string[] } => item !== null).map(({ key , values }) => (
                                <TableRow key={key}>
                                    <TableCell style={{ fontWeight: 600 }}>{key}</TableCell>
                                    <TableCell>{values.join(', ') || 'Nenhum'}</TableCell>
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

                <Typography variant="h6" fontWeight="bold" marginTop={2}>
                    Sinais vitais inicial
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>{renderDataTable(record?.ssvv_inicial)}</TableBody>
                    </Table>
                </TableContainer>

                <Typography variant="h6" fontWeight="bold" marginTop={2}>
                    Sinais vitais final
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>{renderDataTable(record?.ssvv_final)}</TableBody>
                    </Table>
                </TableContainer>

                {/* Renderizando Ausculta Pulmonar */}
                {renderAuscultaPulmonar(record?.ausculta_pulmonar)}
            </Stack>
        </Show>
    );
};
