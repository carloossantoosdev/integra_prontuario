import { renderHook } from '@testing-library/react';
import { toast } from 'react-toastify';

import { useToast } from '../useToast';

describe('useToast', () => {
  test('should call toast.success with the correct message and options', () => {
    const { toastSuccess } = renderHook(() => useToast()).result.current;
    const message = 'Success message';

    const toastSuccessSpy = jest.spyOn(toast, 'success');

    toastSuccess(message);

    expect(toastSuccessSpy).toHaveBeenCalledWith(message, {
      toastId: 'success-toast',
    });
  });

  test('should call toast.error with the correct message and options', () => {
    const { toastError } = renderHook(() => useToast()).result.current;
    const message = 'Error message';

    const toastErrorSpy = jest.spyOn(toast, 'error');

    toastError(message);

    expect(toastErrorSpy).toHaveBeenCalledWith(message, {
      toastId: 'error-toast',
    });
  });

  test('should call toast.info with the correct message and options', () => {
    const { toastInfo } = renderHook(() => useToast()).result.current;
    const message = 'Info message';

    const toastInfoSpy = jest.spyOn(toast, 'info');

    toastInfo(message);

    expect(toastInfoSpy).toHaveBeenCalledWith(message, {
      toastId: 'info-toast',
    });
  });
});
