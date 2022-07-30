import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { getFinancialYear } from '../utils/getFinancialYear';
import { writeIntoDataBase } from '../dataBaseUtils/readWrite';

interface invoiceType {
	date: any;
	amount: string;
	description: string;
	allocation: number;
}

export default function AddInvoiceElement() {
	const [newInvoiceData, setNewInvoiceData] = React.useState<invoiceType>({ date: null, amount: "", description: "", allocation: 0 });
	const [areInpitsValid, setAreInpitsValid] = React.useState(false);


	useEffect(() => {
		setAreInpitsValid(validateInputs(newInvoiceData));
	}, [newInvoiceData])

	const handleUpdateInvoiceData = (data: string, label: string) => {
		setNewInvoiceData({ ...newInvoiceData, [label]: data })
	}
	return (
		<div style={{ display: "inline-block" }}>

			<Paper sx={{ p: 2 }}>
				<Box>
					<LocalizationProvider dateAdapter={AdapterMoment}>
						<DesktopDatePicker
							label="Date"
							inputFormat="DD/MM/YYYY"
							value={newInvoiceData.date}
							onChange={e => handleUpdateInvoiceData(e, "date")}
							renderInput={(params) => <TextField {...params} />}
						/>
					</LocalizationProvider>
				</Box>




				<Box>

					<TextField
						label="Amount"
						margin="normal"
						onChange={e => handleUpdateInvoiceData(e.target.value, "amount")}
					></TextField>
				</Box>
				<Box>

					<TextField
						label="Description"
						margin="normal"
						onChange={e => handleUpdateInvoiceData(e.target.value, "description")}
					></TextField>
				</Box>
				{!areInpitsValid && <>
					<Typography>Enter valid date, amount</Typography><Typography> and description to save</Typography></>}


				<Button
					variant="contained"
					disabled={!areInpitsValid}
					onClick={() => {

						handleSubmit({ ...newInvoiceData, date: formatDate(newInvoiceData.date._d) });
						setNewInvoiceData({ amount: "", description: "", date: null, allocation: 0 });
						// refreshData()
						// handleClose();

					}
					}>Save new invoice</Button>
				<Button variant="contained" sx={{ ml: 1 }} onClick={() => { }}>Cancel</Button>
			</Paper>

		</div>
	)
}


const handleSubmit = (payload: invoiceType) => {
	// addDataIntoFirebase(`invoices/2022/${Date.now()}`, payload);
	writeIntoDataBase("invoices/" + getFinancialYear(payload.date), payload);
	console.log(getFinancialYear(payload.date));
}

const formatDate = (date: any): string => {
	return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

const validateInputs = (newInvoiceData: invoiceType): boolean => {
	return newInvoiceData.date?._isValid && /^\-?\d{1,9}\.?\d{0,2}$/.test(newInvoiceData.amount) && newInvoiceData.description.length > 0
}
