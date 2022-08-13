import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
// import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Dispatch, SetStateAction } from "react";

type Props = {
	setActivePage: Dispatch<SetStateAction<string>>
}

export const MainListItems = ({ setActivePage }: Props) => (
	<React.Fragment>
		<ListItemButton onClick={() => setActivePage("dashboard")}>
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon>
			<ListItemText primary="Dashboard" />
		</ListItemButton>
		<ListItemButton onClick={() => setActivePage("invoices")}>
			<ListItemIcon>
				<ShoppingCartIcon />
			</ListItemIcon>
			<ListItemText primary="Invoices" />
		</ListItemButton>
		<ListItemButton onClick={() => setActivePage("profile")}>
			<ListItemIcon>
				<PeopleIcon />
			</ListItemIcon>
			<ListItemText primary="Profile" />
		</ListItemButton>
		<ListItemButton onClick={() => setActivePage("allocations")}>
			<ListItemIcon>
				<BarChartIcon />
			</ListItemIcon>
			<ListItemText primary="Allocations" />
		</ListItemButton>
		{/* <ListItemButton>
			<ListItemIcon>
				<LayersIcon />
			</ListItemIcon>
			<ListItemText primary="Integrations" />
		</ListItemButton> */}
	</React.Fragment>
);

export const secondaryListItems = (
	<React.Fragment>
		<ListSubheader component="div" inset>
			Saved reports
		</ListSubheader>
		<ListItemButton>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="Current month" />
		</ListItemButton>
		<ListItemButton>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="Last quarter" />
		</ListItemButton>
		<ListItemButton>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="Year-end sale" />
		</ListItemButton>
	</React.Fragment>
);