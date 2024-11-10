import { Box, Button } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useMany, useExport } from '@refinedev/core';
import {
	DateField,
	DeleteButton,
	EditButton,
	List,
	ShowButton,
	useDataGrid,
} from '@refinedev/mui';
import React from 'react';

export const AppointmentsList = () => {
	const { dataGridProps } = useDataGrid({
		syncWithLocation: true,
		meta: {
			select:
				'id, nome, data_nascimento, inicio_atendimento, data_atendimento, valor, observacoes, fisioterapeuta, ssvv_inicial, ssvv_final',
		},
	});

	useMany({
		resource: 'appointments',
		ids:
			dataGridProps?.rows
				?.map((item: { categories: { id: string } }) => item?.categories?.id)
				.filter(Boolean) ?? [],
		queryOptions: {
			enabled: !!dataGridProps?.rows,
		},
	});

	const { triggerExport, isLoading } = useExport({
		resource: 'appointments',
		mapData: (item) => ({
			id: item.id,
			nome: item.nome,
			data_nascimento: item.data_nascimento,
			inicio_atendimento: item.inicio_atendimento,
			data_atendimento: item.data_atendimento,
			valor: item.valor,
			fisioterapeuta: item.fisioterapeuta,
			observacoes: item.observacoes,
			ssvv_inicial: JSON.stringify(item.ssvv_inicial),
			ssvv_final: JSON.stringify(item.ssvv_final),
		}),
	});

	interface SsvvData {
		[key: string]: string | number | null;
	}

	const formatSsvvData = (ssvv: SsvvData | null): string => {
		if (!ssvv) return 'Sem dados';

		const formatted = Object.entries(ssvv)
			.map(([key, value]) => `${key}: ${value}`)
			.join(', ');

		return formatted;
	};

	const columns = React.useMemo<GridColDef[]>(
		() => [
			{
				field: 'id',
				headerName: 'ID',
				type: 'number',
				minWidth: 10,
			},
			{
				field: 'nome',
				flex: 1,
				headerName: 'Nome',
				minWidth: 200,
			},
			{
				field: 'data_nascimento',
				flex: 1,
				headerName: 'Data de Nascimento',
				minWidth: 200,
				renderCell: function render({ value }) {
					return <DateField value={value} />;
				},
			},
			{
				field: 'inicio_atendimento',
				flex: 1,
				headerName: 'Início Atendimento',
				minWidth: 200,
				renderCell: function render({ value }) {
					return <DateField value={value} />;
				},
			},
			{
				field: 'valor',
				flex: 1,
				headerName: 'Valor',
				minWidth: 100,
			},
			{
				field: 'observacoes',
				flex: 1,
				headerName: 'Observações',
				minWidth: 150,
			},
			{
				field: 'fisioterapeuta',
				flex: 1,
				headerName: 'Fisioterapeuta',
				minWidth: 150,
			},
			{
				field: 'ssvv_inicial',
				flex: 1,
				headerName: 'Sinais vitais iniciais',
				minWidth: 150,
				renderCell: function render({ value }) {
					return formatSsvvData(value);
				},
			},
			{
				field: 'ssvv_final',
				flex: 1,
				headerName: 'Sinais vitais finais',
				minWidth: 200,
				renderCell: function render({ value }) {
					return formatSsvvData(value);
				},
			},
			{
				field: 'actions',
				headerName: 'Ações',
				sortable: false,
				renderCell: function render({ row }) {
					return (
						<>
							<EditButton hideText recordItemId={row.id} />
							<ShowButton hideText recordItemId={row.id} />
							<DeleteButton hideText recordItemId={row.id} />
						</>
					);
				},
				align: 'center',
				headerAlign: 'center',
				minWidth: 80,
			},
		],
		[],
	);

	return (
		<List>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				marginBottom={2}
			>
				<Button onClick={triggerExport} disabled={isLoading}>
					{isLoading ? 'Exportando...' : 'Exportar para Excel'}
				</Button>
			</Box>
			<DataGrid {...dataGridProps} columns={columns} autoHeight />
		</List>
	);
};
