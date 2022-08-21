import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { errorType } from "../../types";
import handleSaveAllocation from "./helper_functions/handleSaveAllocation";

const AddAllocationWindow = ({ handleClose, setReRender }: any) => {
  const [allocationName, setAllocationName] = useState('');
  const [error, setError] = useState<errorType>({ status: false, message: "" });

  return (
    <Paper sx={{ p: 2, m: 1 }} >
      <Box component="form" onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleSaveAllocation({ event, allocationName, setReRender, handleClose, setError })}>

        <Typography align="center" sx={{ pb: 2 }}>Add allocation</Typography>
        {error.status && <Typography color="red">{error.message}</Typography>}
        <TextField
          value={allocationName}
          label=" enter new allocation"
          onChange={e => setAllocationName(e.target.value)}
          autoFocus
        />
        <Box sx={{ pt: 2, display: 'flex', justifyContent: 'space-between' }}>

          <Button variant="contained" type="submit">Save</Button>
          <Button variant="contained" onClick={handleClose}>Cancel</Button>
        </Box>
      </Box>
    </Paper >
  )
}

export default AddAllocationWindow;
