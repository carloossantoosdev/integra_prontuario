import { Box, IconButton, Modal as ModalMui, SxProps } from '@mui/material';
import { ReactNode } from 'react';
import { IconClose } from 'src/icons/IconClose';
import { Title } from 'src/modules/invoice/components/Title';

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
            <Title
              sx={{
                mt: 1,
              }}
              label={title}
            />
            {titleIcon}
          </Box>
          <IconButton
            sx={{
              padding: '0',
            }}
            data-testid="close-drawer-icon"
            onClick={onClose}
          >
            <IconClose size={32} />
          </IconButton>
        </HeaderModal>

        <Content>{children}</Content>
      </Container>
    </ModalMui>
  );
}
