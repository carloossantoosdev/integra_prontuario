import React from 'react';
import { Container, Typography } from '@mui/material';

export const Home = () => {
	return (
		<Container
			style={{
				height: '60vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Typography variant="h4" align="center" gutterBottom>
				Bem-vindo a Integra!
			</Typography>
			<Typography variant="body1" align="center" gutterBottom>
				Por favor, selecione um item do menu para continuar.
			</Typography>
		</Container>
	);
};
