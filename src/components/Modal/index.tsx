import { Box, IconButton, Modal as ModalMui, SxProps, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ReactNode } from 'react';

import { Container, Content, HeaderModal } from './styles';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  sx?: SxProps;
  title?: string;
  titleIcon?: ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  children,
  sx,
  title,
  titleIcon,
}: ModalProps) {
  return (
    <ModalMui
      sx={sx}
      open={isOpen}
      onClose={onClose}
    >
      <Container>
        <HeaderModal>
          <Box
            sx={{
              gap: '1rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {title && (
              <Typography sx={{ mt: 1 }} variant="h6" component="h2">
                {title}
              </Typography>
            )}
            {titleIcon}
          </Box>
          <IconButton
            sx={{
              padding: '0',
            }}
            data-testid="close-drawer-icon"
            onClick={onClose}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </HeaderModal>

        <Content>{children}</Content>
      </Container>
    </ModalMui>
  );
}
