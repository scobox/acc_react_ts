import { Button, FormControl, InputLabel, MenuItem, Paper } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useState, useEffect } from 'react';
import ModalWindow from './ModalWindow';
import { AddInvoice } from './AddInvoice';
import { loadDataFromFirebase } from '../dataBaseUtils/readWrite';
import InvoiceTable from './InvoiceTable';

export default function InvoicesPage() {
  const [invoiceSubPage, setInvoiceSubPage] = useState('invoiceList');
  const [invoicePageUpdate, setInvoicePageUpdate] = useState(0);
  const currentYear = new Date().getFullYear();
  const [currentFinancialYear, setCurrentFinancialYear] = useState(`${currentYear}-${currentYear + 1}`);
  const yearsList = [];
  for (let i = 0; i < 5; i++) {
    yearsList.push(`${currentYear - i}-${currentYear + 1 - i}`);
  }

  const handleYearChange = (event: SelectChangeEvent) => {
    setCurrentFinancialYear(event.target.value);
  };

  return (
    <>
      <Paper sx={{ p: 2, m: 1 }}>
        <ModalWindow buttonText='Add invoice'>
          <AddInvoice handleClose={undefined as never} setInvoicePageUpdate={setInvoicePageUpdate} />
          {/* handleClose is prop from parent component ModalWindow */}
        </ModalWindow>
        <Button variant='contained'>Import csv file</Button>
        <FormControl sx={{ ml: 2, minWidth: 180 }} size='small'>
          <InputLabel id='demo-select-small'>Year</InputLabel>
          <Select labelId='demo-simple-select-standard-label' id='demo-simple-select-standard' value={currentFinancialYear} onChange={handleYearChange} label='Age'>
            {yearsList.map((menuItem) => (
              <MenuItem key={menuItem} id={menuItem} value={menuItem}>
                {menuItem}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>
      {invoiceSubPage === 'invoiceList' && <InvoiceList invoicePageUpdate={invoicePageUpdate} currentFinancialYear={currentFinancialYear} />}
    </>
  );
}
type props = {
  invoicePageUpdate: number;
  currentFinancialYear: string;
};
function InvoiceList({ invoicePageUpdate, currentFinancialYear }: props) {
  type InvoiceListType = any[];
  const [invoiceList, setInvoiceList] = useState<InvoiceListType>([]);
  const [reRender, setRerender] = useState(0);

  useEffect(() => {
    loadDataFromFirebase(`invoices/${currentFinancialYear}`).then((res: any) => {
      const invoices = Object.keys(res).map((key) => res[key]);

      setInvoiceList(invoices);
    });
  }, [invoicePageUpdate, currentFinancialYear, reRender]);
  return (
    <Paper sx={{ p: 2, m: 1 }}>
      <>
        <InvoiceTable invoiceList={invoiceList} setRerender={setRerender} />
      </>
    </Paper>
  );
}
