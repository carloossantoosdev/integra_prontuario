/* eslint-disable @typescript-eslint/no-unused-vars */
import { OutlinedInputProps, SxProps, Typography } from '@mui/material';
import React from 'react';

import { Container, CustomInput } from './styles';

interface InputProps extends OutlinedInputProps {
  name: string;
  label?: string;
  helperText?: string;
  sx?: SxProps;
}

export const Input = React.forwardRef(function Input(props: InputProps, ref) {
  const { name, label, helperText, placeholder, sx, ...rest } = props;

  return (
    <Container>
      {label && (
        <Typography
          htmlFor={props.name || ''}
          fontSize="1.4rem"
          lineHeight="1.7rem"
          component="label"
          color={!props.disabled ? 'text.primary' : 'neutral.pure'}
        >
          {label}
        </Typography>
      )}

      <CustomInput
        {...rest}
        sx={{ mt: props.label ? 0.5 : 0, ...sx }}
        placeholder={placeholder}
        id={props.name}
        role={'textbox'}
        ref={ref}
        autoComplete="off"
      />

      {helperText && (
        <Typography
          variant="caption"
          component="p"
          sx={{
            color: props.error ? 'error.main' : 'text.secondary',
          }}
        >
          {helperText}
        </Typography>
      )}
    </Container>
  );
});
