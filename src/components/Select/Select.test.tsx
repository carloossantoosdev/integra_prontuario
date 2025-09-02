import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import { Select } from './';

const setup = (props = {}) => {
  const defaultProps = {
    label: 'Label select',
    options: [
      {
        id: 'option-1',
        label: 'label-option-1',
      },
      {
        id: 'option-2',
        label: 'label-option-2',
      },
    ],
  };
  const setupProps = { ...defaultProps, ...props };

  const view = render(<Select {...setupProps} />);

  return { ...view };
};

describe('Select', () => {
  it('should render', () => {
    const { container } = setup();
    expect(container).toBeInTheDocument();
  });
});
