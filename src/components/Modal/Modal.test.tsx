import '@testing-library/jest-dom';

import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';

import { Modal, ModalProps } from '.';

const setup = (props: Partial<ModalProps> = {}) => {
  const dummyContent = 'Modal is open!';

  const defaultProps: ModalProps = {
    isOpen: true,
    onClose: () => {},
    children: <div>{dummyContent}</div>,
  };

  const setupProps = { ...defaultProps, ...props };

  const view = render(<Modal {...setupProps} />);

  return {
    ...view,
    ...setupProps,
    dummyContent,
  };
};

describe('Modal', () => {
  test('renders correctly', () => {
    const { getByText } = setup();

    const Drawer = getByText('Modal is open!');
    expect(Drawer).toBeInTheDocument();
  });
  test('should close modal', () => {
    const handleClose = jest.fn();

    const { getByTestId } = setup();

    fireEvent.click(getByTestId('close-drawer-icon'));

    waitFor(() => {
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });
});
