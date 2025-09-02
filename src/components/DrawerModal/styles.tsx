import { IconButton } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { CSSObject,styled, Theme } from '@mui/material/styles';

const drawerWidth = 314;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#F5F5F5',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: '#F5F5F5',
});

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  zIndex: 1,
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export const DrawerHeader = styled('div')(({ theme }) => ({
  padding: theme.spacing(3, 3, 0, 3),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export const Icon = styled(IconButton)`
  color: ${({ theme }) => theme.palette.primary.main};
  &:hover {
    background-color: transparent;
  }

  padding: 0;
`;

export const DrawerContent = styled('div')``;
