/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import { Box, Button, IconButton } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useMany } from '@refinedev/core';
import {
	DateField,
	List,
	ShowButton,
	useDataGrid,
} from '@refinedev/mui';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const PacienteList = () => {
	const location = useLocation(); 
	const queryParams = new URLSearchParams(location.search);
	const pageSize = queryParams.get('pageSize') || 10; 
	const current = queryParams.get('current') || 1; 

	const navigate = useNavigate(); 

	const { dataGridProps } = useDataGrid({
		meta: {
			select:
				'id, nome, data_nascimento, inicio_atendimento, valor, area_atendimento, fisioterapeuta',
		},
		pagination: {
			pageSize: Number(pageSize), 
			current: Number(current), 
		},
	});

	useMany({
		resource: 'pacientes',
		ids:
			dataGridProps?.rows
				?.map((item: { categories: { id: string } }) => item?.categories?.id)
				.filter(Boolean) ?? [],
		queryOptions: {
			enabled: !!dataGridProps?.rows,
		},
	});

	const columns = React.useMemo<GridColDef[]>(() => [
		{
			field: 'actions',
			headerName: 'Ações',
			sortable: false,
			renderCell: ({ row }) => (
				<Box display="flex" justifyContent="center" alignItems="center">
					<IconButton
						onClick={() => {
							row.area_atendimento === 'RCP' 
								? navigate(`/evolucao_rcp/create/${row.id}`) 
								: navigate(`/evolucao_dnm/create/${row.id}`);
						}}
					>
						 <AddCircleOutlineIcon sx={{ fontSize: 20 }} color='primary'/> 
					</IconButton>
					

					<ShowButton hideText recordItemId={row.id} />
				</Box>
			),
			// renderCell: function render({ row }) {
			// 	return (
			// 		<Box display="flex" justifyContent="center" alignItems="center">
			// 			<ShowButton hideText recordItemId={row.id} />
			// 			<EditButton hideText recordItemId={row.id} />
			// 			<DeleteButton 
			// 				hideText 
			// 				recordItemId={row.id}  
			// 				confirmTitle="Deseja excluir este item?" 
			// 				confirmCancelText='Cancelar'
			// 				confirmOkText='Excluir'
			// 			/>
			// 		</Box>
			// 	);
			// },
			align: 'center',
			headerAlign: 'center',
			minWidth: 100,
		},
		{
			field: 'nome',
			flex: 1,
			headerName: 'Nome',
			minWidth: 150,
		},
		{
			field: 'data_nascimento',
			flex: 1,
			headerName: 'Data nascimento',
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
			headerName: 'Início atendimento',
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
			minWidth: 120,
			renderCell: function render({ value }) {
				return value ? `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'R$ 0,00';
			},
		},
		{
			field: 'area_atendimento',
			flex: 1,
			headerName: 'Área de atendimento',
			minWidth: 150,
		},
		{
			field: 'fisioterapeuta',
			flex: 1,
			headerName: 'Fisioterapeuta',
			minWidth: 150,
		},
	], []);

	const handleCreate = () => {
		navigate('/pacientes/create');  
	};


	return (
		<List
			headerButtons={[
				null
			]}
		>
			<Box
				sx={{
					width: '100%',
					display: 'flex',
					justifyContent: 'end',
					marginBottom: 2,
				}}
			>
				<Button 
					onClick={handleCreate} 
					variant="contained" 
				>
						Novo paciente
				</Button>
			</Box>
				
			<DataGrid {...dataGridProps} columns={columns}  />
		</List>
	);
};
