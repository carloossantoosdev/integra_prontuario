import { Box, OutlinedInput, OutlinedInputProps, styled } from '@mui/material';

export const Container = styled(Box)`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  /* margin-block: 12px; */
`;

export const CustomInput = styled(OutlinedInput)<OutlinedInputProps>`
  max-height: 48px;

  & .MuiOutlinedInput-notchedOutline {
    border: 1px solid #687178;
    border-radius: 8px;
    padding: 12px 16px;
  }

  & ::placeholder {
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 1.9rem;
  }

  & legend {
    display: none;
  }

  & fieldset {
    top: 0;
  }
`;
