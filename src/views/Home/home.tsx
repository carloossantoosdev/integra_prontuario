import React from 'react';
import { Box, Container, Typography } from '@mui/material';

export const Home = () => {
  return (
    <Container
      sx={{
        backgroundImage: 'url(/IntegraLogo.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 'calc(100vh - 30vh)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
        >
          Bem-vindo a Integra!
        </Typography>
        <Typography
          variant="body1"
          align="center"
          gutterBottom
        >
          Por favor, selecione um item do menu para continuar.
        </Typography>
      </Box>
    </Container>
  );
};
