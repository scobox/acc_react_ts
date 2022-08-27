import { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Toolbar, Button, IconButton, Typography, Divider, List, Drawer as MuiDrawer } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { MainListItems } from './listItems';
import { logoutFromFirebase } from '../dataBaseUtils/auth/authUtils';
import InvoicesPage from './InvoicesPage';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Allocations from './allocations/Allocations';
import { HomePageRoutePath } from '../types';

type Props = {
  setSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent({ setSignedIn }: Props) {
  const [activePage, setActivePage] = useState(HomePageRoutePath.Invoices);
  const [open, setOpen] = useState(true);
  const HomePageRouteComponentMap = {
    [HomePageRoutePath.Invoices]: InvoicesPage,
    [HomePageRoutePath.Dashboard]: Dashboard,
    [HomePageRoutePath.Profile]: Profile,
    [HomePageRoutePath.Allocations]: Allocations,
  };
  const HomePageRouteComponent = HomePageRouteComponentMap[activePage];
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogoutRequest = () => {
    logoutFromFirebase();
    setSignedIn(false);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position='absolute' open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography component='h1' variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <Button variant='contained' onClick={handleLogoutRequest}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer variant='permanent' open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component='nav'>
            <MainListItems setActivePage={setActivePage} />
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component='main'
          sx={{
            backgroundColor: (theme) => (theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]),
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          {<HomePageRouteComponent />}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function HomePage({ setSignedIn }: Props) {
  return <DashboardContent setSignedIn={setSignedIn} />;
}
