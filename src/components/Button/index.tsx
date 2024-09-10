import { ButtonProps } from '@mui/material';

import { CustomButton } from './styles';

interface IButtonProps extends ButtonProps {
  label?: string | React.ReactNode;
  icon?: React.ReactNode;
  slotRight?: React.ReactNode;
}

export const Button = ({ label, icon, slotRight, ...rest }: IButtonProps) => {
  return (
    <CustomButton
      fullWidth
      {...rest}
    >
      {icon}
      {label}
      {slotRight}
    </CustomButton>
  );
};
