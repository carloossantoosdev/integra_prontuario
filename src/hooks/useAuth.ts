import { useContext } from 'react';
import { AuthContext } from 'src/context/auth';

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};