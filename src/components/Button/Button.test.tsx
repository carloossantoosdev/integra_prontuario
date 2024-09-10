import '@testing-library/jest-dom';

import { fireEvent, render } from '@testing-library/react';

import { Button } from './';

const setup = (props = {}) => {
  const mockedOnClick = jest.fn();
  const defaultProps = { label: 'Button', onClick: mockedOnClick };
  const setupProps = { ...defaultProps, ...props };

  const view = render(<Button {...setupProps} />);

  return { ...view, mockedOnClick };
};

describe('Button', () => {
  it('should render', () => {
    const { container } = setup();
    expect(container).toBeInTheDocument();
  });

  it('shoul call function when click button', () => {
    const { mockedOnClick, getByText } = setup({ label: 'Button Test' });

    fireEvent.click(getByText('Button Test'));

    expect(mockedOnClick).toHaveBeenCalled();
  });
});
