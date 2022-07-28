import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props: { onClose: (selectedValue: string) => void; selectedValue: string; open: boolean, children: React.ReactNode }) {
	const { onClose, selectedValue, open, children } = props;

	const handleClose = () => {
		onClose(selectedValue);
	};

	// const handleListItemClick = (value) => {
	// 	onClose(value);
	// };

	return (
		<Dialog onClose={handleClose} open={open}>
			{children && React.cloneElement(children as React.ReactElement<any>, { handleClose: handleClose })}


		</Dialog>
	);
}

SimpleDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	selectedValue: PropTypes.string.isRequired,
};

export default function ModalWindow(props: { buttonText: string, children?: React.ReactNode }) {
	const { buttonText, children } = props
	const [open, setOpen] = React.useState(false);
	const [selectedValue, setSelectedValue] = React.useState(emails[1]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (value: string) => {
		setOpen(false);
		setSelectedValue(value);
	};

	return (
		<>
			<Button sx={{ mr: 2 }} onClick={handleClickOpen} variant="contained">
				{buttonText}
			</Button>
			<SimpleDialog
				selectedValue={selectedValue}
				open={open}
				onClose={(e) => handleClose(e)}
				children={children}
			/>
		</>
	);
}
