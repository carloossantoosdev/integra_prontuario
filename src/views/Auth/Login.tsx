import React from 'react';
import { useLogin } from '@refinedev/core';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const { mutate: login, isLoading } = useLogin();
  const navigate = useNavigate();

  // Login temporário para desenvolvimento - bypassa autenticação
  const handleTempLogin = () => {
    // Simula um login bem-sucedido
    localStorage.setItem('temp_auth', 'true');
    navigate('/');
    window.location.reload();
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Paper
        elevation={3}
        sx={{ p: 4, width: 380 }}
      >
        <Stack
          spacing={3}
          alignItems="center"
        >
          <Typography variant="h6">Integra</Typography>
          <Typography
            variant="h5"
            align="center"
          >
            Entrar
          </Typography>

          {/* Login temporário para desenvolvimento */}
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={handleTempLogin}
          >
            🔧 Acesso Temporário (DEV)
          </Button>

          {/* Google OAuth - desabilitado temporariamente */}
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            startIcon={<GoogleIcon />}
            disabled={true}
            title="Google OAuth será configurado depois"
          >
            Entrar com Google (Em breve)
          </Button>

          <Typography
            variant="caption"
            color="text.secondary"
            align="center"
          >
            Use "Acesso Temporário" para testar as collections
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;
