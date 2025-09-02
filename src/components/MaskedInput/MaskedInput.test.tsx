import '@testing-library/jest-dom';

import { fireEvent, render } from '@testing-library/react';

import { MaskedInput } from './';

const setup = (props = {}) => {
  const defaultProps = {
    name: 'input',
    label: 'Label maskedinput',
    mask: '*****',
  };
  const setupProps = { ...defaultProps, ...props };

  const view = render(<MaskedInput {...setupProps} />);

  return { ...view };
};

describe('MaskedInput', () => {
  it('should render', () => {
    const { container } = setup();
    expect(container).toBeInTheDocument();
  });

  it('should only accept number in number masks', () => {
    const { getByLabelText } = setup({ mask: '99999' });

    fireEvent.change(getByLabelText('Label maskedinput'), {
      target: { value: 'aaaaa' },
    });

    expect(getByLabelText('Label maskedinput')).toHaveValue('');

    fireEvent.change(getByLabelText('Label maskedinput'), {
      target: { value: '123456789' },
    });

    expect(getByLabelText('Label maskedinput')).toHaveValue('12345');
  });

  it('should uppercase letter masks', () => {
    const { getByLabelText } = setup({ mask: 'aaaaaa' });

    fireEvent.change(getByLabelText('Label maskedinput'), {
      target: { value: 'abcdef' },
    });

    expect(getByLabelText('Label maskedinput')).toHaveValue('ABCDEF');
  });

  it('should only accept letters in letter masks', () => {
    const { getByLabelText } = setup({ mask: 'aaaa' });

    fireEvent.change(getByLabelText('Label maskedinput'), {
      target: { value: '1111' },
    });

    expect(getByLabelText('Label maskedinput')).toHaveValue('');

    fireEvent.change(getByLabelText('Label maskedinput'), {
      target: { value: 'abcdefgh' },
    });

    expect(getByLabelText('Label maskedinput')).toHaveValue('ABCD');
  });
});
