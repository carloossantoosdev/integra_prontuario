import { useCallback, useState } from 'react';

type ModalState = {
  isOpen: boolean;
  handleClose: () => void;
  handleOpen: () => void;
};

export const useModal = (initialState = false): ModalState => {
  const [isOpen, setIsOpen] = useState(initialState);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  return { isOpen, handleClose, handleOpen };
};
