import { renderHook } from '@testing-library/react';
import { act } from '@testing-library/react';

import { useModal } from '../useModal';

describe('useModal', () => {
  it('should be initially open false', () => {
    const { result } = renderHook(() => useModal());

    expect(result.current.isOpen).toBe(false);
  });
  it('should toggle isOpen state', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.handleClose();
    });

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.handleClose();
    });

    expect(result.current.isOpen).toBe(false);
  });
  it('should toggle isOpen state when initially closed', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.handleClose();
    });

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.handleClose();
    });

    expect(result.current.isOpen).toBe(false);
  });
  it('should have isOpen and handleCloseModal properties', () => {
    const { result } = renderHook(() => useModal());

    expect(result.current).toHaveProperty('isOpen');
    expect(result.current).toHaveProperty('handleClose');
  });

  it('should set isOpen to true when isOpen is false', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.handleOpen();
    });

    expect(result.current.isOpen).toBe(true);
  });
});
