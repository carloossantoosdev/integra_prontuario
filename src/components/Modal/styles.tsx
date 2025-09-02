import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const Container = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 741px;

  background-color: #fff;
  border-radius: 8px;
`;

export const HeaderModal = styled(Box)`
  padding: 2rem 2rem;
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  border-bottom: 1px solid #dadce0;

  & > svg {
    cursor: pointer;
  }
`;

export const Content = styled(Box)`
  padding: 2rem;
`;
