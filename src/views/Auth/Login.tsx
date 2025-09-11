import React from 'react';
import { AuthPage } from '@refinedev/mui';

export const Login: React.FC = () => {
  return (
    <AuthPage
      type="login"
      formProps={{
        defaultValues: { email: '', password: '' },
      }}
      registerLink={false}
      forgotPasswordLink={false}
    />
  );
};

export default Login;
