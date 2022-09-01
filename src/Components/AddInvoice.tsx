import { Button, Paper, TextareaAutosize, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import React from "react";
import { useForm } from "react-hook-form";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { updateDataInFirebase } from "../dataBaseUtils/readWrite";
import { getFinancialYear } from "../utils/getFinancialYear";

type props = {
  handleClose: any;
  setInvoicePageUpdate: React.Dispatch<React.SetStateAction<number>>;
};

export function AddInvoice({ handleClose, setInvoicePageUpdate }: props) {
  type Inputs = {
    amount: string;
    date: string;
    description: string;
  };

  type InputValidationMessagesType = {
    amount: boolean;
    description: boolean;
  };
  const [date, setDate] = React.useState<Date | null>(new Date());
  const [inputValid, setInputValid] = React.useState<InputValidationMessagesType>({
    amount: false,
    description: false,
  });

  const handleDateChange = (newDate: Date | null) => {
    setDate(newDate);
  };

  function handleInvoiceSaveRequest(data: any) {
    const isAmountValid = /^[0-9]+(\.[0-9]{1,2})?$/.test(data.amount);
    const isDescriptionValid = data.description.length > 0;
    if (isAmountValid && isDescriptionValid) {
      const id = Date.now();
      const path: string = `invoices/${getFinancialYear(data.date)}/${id}`;
      updateDataInFirebase(path, { ...data, id, allocation: 0 });
      reset();
      setInvoicePageUpdate((prev: number) => prev + 1);
      handleClose();
    } else {
      setInputValid({ description: !isDescriptionValid, amount: !isAmountValid });
    }
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const watchAmount = watch("amount", "");
  const watchDescription = watch("description", "");
  React.useEffect(() => {
    setInputValid({ amount: false, description: false });
  }, [watchAmount, watchDescription]);
  return (
    <Paper sx={{ p: 2, m: 1 }}>
      <Typography component='h1' variant='h6' color='inherit' noWrap>
        Add invoice
      </Typography>
      <Box>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <MobileDatePicker
            label='Date'
            inputFormat='DD/MM/YYYY'
            onChange={handleDateChange}
            value={date}
            renderInput={(params) => <TextField {...params} {...register("date")} />}
          />
        </LocalizationProvider>
      </Box>
      <Box>
        <TextField margin='normal' required label='Amount' {...register("amount")} />
        {/* { pattern: /^[0-9]*(\.[0-9]{2})?$/ } */}
      </Box>
      {inputValid.amount && <Typography color='red'>enter correct amount</Typography>}
      <Box sx={{ mt: 2, mb: 2 }}>
        <Typography> Invoice description</Typography>
        {inputValid.description && (
          <Typography color='red'>Description can not be blank</Typography>
        )}
        <TextareaAutosize style={{ width: 280, height: 40 }} {...register("description")} />
      </Box>
      <Button variant='contained' sx={{ mr: 2 }} onClick={handleSubmit(handleInvoiceSaveRequest)}>
        Add invoice
      </Button>
      <Button variant='contained' onClick={handleClose}>
        Cancel
      </Button>
    </Paper>
  );
}
