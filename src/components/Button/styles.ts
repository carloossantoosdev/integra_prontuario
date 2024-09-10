import { Button, darken,styled } from '@mui/material';

export const CustomButton = styled(Button)`
  background: #05662c;
  border-radius: 16px;
  padding: 16px;
  color: #ffffff;
  text-decoration: none;
  text-transform: none;

  &:hover {
    background: ${darken('#05662c', 0.3)};
  }
`;
