import { ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Dispatch, SetStateAction } from 'react';
import { HomePageRoutePath } from '../types';

type Props = {
  setActivePage: Dispatch<SetStateAction<HomePageRoutePath>>;
};

export const MainListItems = ({ setActivePage }: Props) => (
  <>
    <ListItemButton onClick={() => setActivePage(HomePageRoutePath.Dashboard)}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary='Dashboard' />
    </ListItemButton>
    <ListItemButton onClick={() => setActivePage(HomePageRoutePath.Invoices)}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary='Invoices' />
    </ListItemButton>
    <ListItemButton onClick={() => setActivePage(HomePageRoutePath.Profile)}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary='Profile' />
    </ListItemButton>
    <ListItemButton onClick={() => setActivePage(HomePageRoutePath.Allocations)}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary='Allocations' />
    </ListItemButton>
  </>
);

export const secondaryListItems = (
  <>
    <ListSubheader component='div' inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Current month' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Last quarter' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Year-end sale' />
    </ListItemButton>
  </>
);
