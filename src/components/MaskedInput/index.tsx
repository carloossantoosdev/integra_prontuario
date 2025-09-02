import { InputAdornment, SxProps } from '@mui/material';
import React from 'react';
import InputMask, { Props, BeforeMaskedStateChangeStates } from 'react-input-mask';

import { Input } from '../Input';

interface IMaskedInputProps extends Props {
  name: string;
  label?: string;
  error?: boolean;
  helperText?: string;
  endAdornment?: React.ReactNode;
  sx?: SxProps;
}

export const MaskedInput = React.forwardRef(function MaskedInput(
  props: IMaskedInputProps,
  ref
) {
  const { name, label, error, helperText, endAdornment, sx, ...rest } = props;

  function beforeMaskedStateChange({ nextState }: BeforeMaskedStateChangeStates) {
    let { value } = nextState;

    value = value.toUpperCase();

    return {
      ...nextState,
      value,
    };
  }

  type InputMaskChildProps = Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'onFocus' | 'onBlur' | 'value'
  >;

  return (      
    <InputMask
      {...rest}
      maskPlaceholder={null}
      beforeMaskedStateChange={beforeMaskedStateChange}
    >
      {(inputMaskProps: Partial<InputMaskChildProps>) => {
        const { onChange, onFocus, onBlur, value } = inputMaskProps;
        return (
          <Input
            sx={sx}
            ref={ref}
            name={name}
            data-testid={`MaskedInput-${name}`}
            label={label}
            error={error}
            helperText={helperText}
            autoComplete="off"
            endAdornment={
              endAdornment ? (
                <InputAdornment position="end">{endAdornment}</InputAdornment>
              ) : null
            }
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            value={value}
          />
        );
      }}
    </InputMask>
  );
});
