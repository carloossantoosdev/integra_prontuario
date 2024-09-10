import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import { Input } from './';

const setup = (props = {}) => {
  const defaultProps = {
    name: 'input',
  };
  const setupProps = { ...defaultProps, ...props };

  const view = render(<Input {...setupProps} />);

  return { ...view };
};

describe('Input', () => {
  it('should render', () => {
    const { container } = setup({ label: 'Label input' });
    expect(container).toBeInTheDocument();
  });

  it('should render without label', () => {
    const { container } = setup({});
    expect(container).toBeInTheDocument();
  });

  it('should render label', () => {
    const { container, getByText } = setup({
      label: 'Label input',
      disabled: true,
    });
    expect(container).toBeInTheDocument();

    expect(getByText('Label input')).toBeInTheDocument();
  });

  it('should render with error', () => {
    const { container, getByText } = setup({
      helperText: 'Input error',
      error: true,
    });
    expect(container).toBeInTheDocument();

    expect(getByText('Input error')).toBeInTheDocument();
    expect(getByText('Input error')).toHaveStyle(`color: rgb(211, 47, 47);`);
  });

  it('should render with helperText', () => {
    const { container, getByText } = setup({
      helperText: 'Input helperText',
      error: false,
    });
    expect(container).toBeInTheDocument();

    expect(getByText('Input helperText')).toBeInTheDocument();
    expect(getByText('Input helperText')).not.toHaveStyle(
      `color: rgb(211, 47, 47);`
    );
  });
});
