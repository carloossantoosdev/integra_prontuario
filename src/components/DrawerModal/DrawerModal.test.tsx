import '@testing-library/jest-dom';

import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';

import { DrawerModal, DrawerModalProps } from '.';

const setup = (props: Partial<DrawerModalProps> = {}) => {
  const dummyContent = 'Drawer is open!';

  const defaultProps: DrawerModalProps = {
    isOpen: true,
    onClose: () => {},
    children: <div>{dummyContent}</div>,
  };

  const setupProps = { ...defaultProps, ...props };

  const view = render(<DrawerModal {...setupProps} />);

  return {
    ...view,
    ...setupProps,
    dummyContent,
  };
};

describe('DrawerModal', () => {
  test('renders correctly', () => {
    const { getByText } = setup();

    const Drawer = getByText('Drawer is open!');
    expect(Drawer).toBeInTheDocument();
  });

  test('should open modal drawer modal', () => {
    const handleClose = jest.fn();

    const { getByTestId } = setup({ isOpen: false });

    fireEvent.click(getByTestId('close-drawer-icon'));

    waitFor(() => {
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });
  test('should close drawer modal', () => {
    const handleClose = jest.fn();

    const { getByTestId } = setup();

    fireEvent.click(getByTestId('close-drawer-icon'));

    waitFor(() => {
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });
});
