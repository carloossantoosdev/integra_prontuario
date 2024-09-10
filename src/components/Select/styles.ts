import { styled } from '@mui/material';

export const sxMenuProps = {
  sx: {
    '& .MuiMenu-list': {
      padding: 0,
      border: '2px solid #3B4247',
    },

    '& .MuiPopover-paper': {
      boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.08)',
    },
  },
};

export const Placeholder = styled('span')`
  opacity: 0.42;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1.9rem;
`;
