import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React, { ReactNode } from 'react';

import { Drawer, DrawerContent, DrawerHeader, Icon } from './styles';
import { IconArrowLeft } from '@/icons/IconArrowLeft';
import { IconArrowRight } from '@/icons/IconArrowRight';

export interface DrawerModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  children?: ReactNode;
}

export function DrawerModal({
  isOpen,
  onClose,
  onOpen,
  children,
}: DrawerModalProps) {
  return (
    <Drawer
      variant="permanent"
      open={isOpen}
    >
      <DrawerHeader>
        {isOpen && (
          <Typography
            sx={{
              flex: 1,
              fontSize: '18px',
              fontWeight: 600,
              lineHeight: '22px',
            }}
          >
            Menu
          </Typography>
        )}
        <Icon
          onClick={isOpen ? onClose : onOpen}
          data-testid="close-drawer-icon"
        >
          {isOpen ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <IconArrowLeft />
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 600,
                  lineHeight: '16px',
                  color: '#05662B',
                }}
              >
                Esconder
              </Typography>
            </Box>
          ) : (
            <IconArrowRight />
          )}
        </Icon>
      </DrawerHeader>
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  );
}
