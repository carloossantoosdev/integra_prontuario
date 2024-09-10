import { useCallback } from 'react';
import { toast } from 'react-toastify';

export interface UseToast {
  toastSuccess: (message: string) => void;
  toastError: (message: string) => void;
  toastInfo: (message: string) => void;
}

export function useToast(): UseToast {
  const toastSuccess = useCallback((message: string) => {
    toast.success(message, {
      toastId: 'success-toast',
    });
  }, []);

  const toastError = useCallback((message: string) => {
    toast.error(message, {
      toastId: 'error-toast',
    });
  }, []);

  const toastInfo = useCallback((message: string) => {
    toast.info(message, {
      toastId: 'info-toast',
    });
  }, []);

  return {
    toastSuccess,
    toastError,
    toastInfo,
  };
}
