/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
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
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

type SsvvData = {
	[key: string]: string | number;
};

export const AppointmentsList = () => {
	const location = useLocation(); 
	const queryParams = new URLSearchParams(location.search);
	const pageSize = queryParams.get('pageSize') || 10; 
	const current = queryParams.get('current') || 1; 

	const navigate = useNavigate(); 

	const { dataGridProps } = useDataGrid({
		meta: {
			select:
				'id, nome, data_nascimento, inicio_atendimento, valor, observacoes, fisioterapeuta, ssvv_inicial, ssvv_final',
		},
		pagination: {
			pageSize: Number(pageSize), 
			current: Number(current), 
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
			valor: item.valor,
			fisioterapeuta: item.fisioterapeuta,
			observacoes: item.observacoes,
			ssvv_inicial: JSON.stringify(item.ssvv_inicial),
			ssvv_final: JSON.stringify(item.ssvv_final),
		}),
	});	

	const columns = React.useMemo<GridColDef[]>(() => [
		{
			field: 'actions',
			headerName: 'Ações',
			sortable: false,
			renderCell: function render({ row }) {
				return (
					<Box display="flex" justifyContent="center" alignItems="center">
						<ShowButton hideText recordItemId={row.id} />
						<EditButton hideText recordItemId={row.id} />
						<DeleteButton 
							hideText 
							recordItemId={row.id}  
							confirmTitle="Deseja excluir este item?" 
							confirmCancelText='Cancelar'
							confirmOkText='Excluir'
						/>
					</Box>
				);
			},
			align: 'center',
			headerAlign: 'center',
			minWidth: 80,
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
				return (
					<Box display="flex" justifyContent="flex-start" alignItems="center" height="100%">
						<DateField value={value} />
					</Box>
				);
			},
		},
		{
			field: 'inicio_atendimento',
			flex: 1,
			headerName: 'Início Atendimento',
			minWidth: 200,
			renderCell: function render({ value }) {
				return (
					<Box display="flex" justifyContent="flex-start" alignItems="center" height="100%">
						<DateField value={value} />
					</Box>
				);
			},
		},
		{
			field: 'valor',
			flex: 1,
			headerName: 'Valor',
			minWidth: 100,
			renderCell: function render({ value }) {
				return value ? `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'R$ 0,00';
			},
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
	], []);

	const handleCreate = () => {
		navigate('/appointments/create');  
	};

	const formatSsvvData = (ssvv: SsvvData | null): string => {
		if (!ssvv) return 'Sem dados';

		const formatted = Object.entries(ssvv)
			.map(([key, value]) => `${key}: ${value}`)
			.join(', ');

		return formatted;
	};

	return (
		<List
			headerButtons={[
				<Box
					sx={{
						marginTop: 2,
					}}
				>
					<Button
						onClick={triggerExport}
						disabled={isLoading}
						color="primary"
						variant="outlined"
						sx={{
							marginRight: 2,
						}}
						>
					{isLoading ? 'Exportando...' : 'Exportar'}
					</Button>
					<Button onClick={handleCreate} variant="contained">
						Adicionar
					</Button>
				</Box>
			]}
		>
			<DataGrid {...dataGridProps} columns={columns}  />
		</List>
	);
};
