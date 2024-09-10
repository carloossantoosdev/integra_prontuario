'use client';

import React from 'react';
import Link from 'next/link';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { DrawerModal } from '../DrawerModal';
import { useModal } from '@/hooks/useModal';

import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';

export const Sidebar = () => {
    const { isOpen, handleOpen, handleClose } = useModal(true);

    return (
        <DrawerModal
            isOpen={isOpen}
            onClose={handleClose}
            onOpen={handleOpen}
        >
            <List>
                <ListItem component={Link} href="/">
                    <ListItemIcon>
                        <HomeIcon sx={{ color: '#05662b', ml:'6px' }} />
                    </ListItemIcon>
                    {isOpen && <ListItemText primary="Lista de atendimentos" />}
                </ListItem>
                <ListItem component={Link} href="/cadastro-atendimentos">
                    <ListItemIcon>
                        <AddBoxIcon sx={{ color: '#05662b', ml: '6px' }} />
                    </ListItemIcon>
                    {isOpen && <ListItemText primary="Cadastro de atendimentos" />}
                </ListItem>
            </List>
        </DrawerModal>
    );
};