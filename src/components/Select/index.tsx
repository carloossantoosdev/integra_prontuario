import {
  MenuItem,
  Select as MuiSelect,
  SelectProps,
  SxProps,
} from '@mui/material';
import React from 'react';

import { Input } from '../Input';
import { Placeholder, sxMenuProps } from './styles';

export type TSelectOption = {
  id: string;
  label: string;
};

interface ISelectInputProps extends Omit<SelectProps, 'sx'> {
  label?: string;
  options: TSelectOption[];
  helperText?: string;
  sx?: SxProps;
}

export const Select = React.forwardRef(function Select(
  props: ISelectInputProps,
  ref
) {
  const { placeholder, options, label, name = '', error, helperText, sx, ...rest } =
    props;

  return (
    <MuiSelect
      {...rest}
      sx={sx}
      MenuProps={sxMenuProps}
      displayEmpty
      inputProps={{ 'data-testid': 'select' }}
      ref={ref}
      renderValue={
        rest.value !== ''
          ? undefined
          : () => <Placeholder>{placeholder}</Placeholder>
      }
      input={
        <Input
          label={label}
          name={name}
          placeholder={placeholder}
          error={!!error}
          helperText={helperText}
        />
      }
    >
      {options?.map(item => (
        <MenuItem
          data-testid="select-option"
          key={item.id}
          value={item.id}
        >
          {item.label}
        </MenuItem>
      ))}
    </MuiSelect>
  );
});
