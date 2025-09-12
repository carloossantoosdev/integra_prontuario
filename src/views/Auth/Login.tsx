import React from 'react';
import { useLogin } from '@refinedev/core';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

export const Login: React.FC = () => {
  const { mutate: login, isLoading } = useLogin();

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
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<GoogleIcon />}
            disabled={isLoading}
            onClick={() => login({ providerName: 'google' } as any)}
          >
            Entrar com Google
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;
