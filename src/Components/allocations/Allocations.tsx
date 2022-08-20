import { Button, List, ListItem, Paper, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { loadDataFromFirebase } from '../../dataBaseUtils/readWrite'
import { editType } from '../../types';
import ModalWindow from '../ModalWindow';
import AllocationItem from './AllocationItem';
import AllocationItemEditable from './AllocationItemEditable';
import { saveAllocationIntoDb } from './helper_functions/saveAllocationIntoDb';

export default function Allocations() {
  const [allocations, setAllocations] = useState<any[]>([]);
  const [reRender, setReRender] = useState(0);
  const [edit, setEdit] = useState<editType>({ status: false, allocationId: undefined });
  useEffect(() => {
    getAllocations(setAllocations);
  }, [reRender]);

  return (
    <>
      <Paper sx={{ p: 2, m: 1 }} >
        <ModalWindow buttonText="Add new allocation">
          <AddAllocationWindow handleClose={undefined as never} setReRender={setReRender} />
        </ModalWindow>
      </Paper>
      <Paper sx={{ p: 2, m: 1 }} >
        {allocations.length ?
          <>
            <List sx={{ width: '100%', maxWidth: 660, bgcolor: 'background.paper' }}>
              {allocations.map((allocation: any) => (allocation.id !== 0 &&
                <>
                  <ListItem
                    key={allocation.name}
                  >
                    {(edit.status && edit.allocationId === allocation.id) ?
                      <AllocationItemEditable allocation={allocation} setEdit={setEdit} setReRender={setReRender} /> :
                      <AllocationItem allocation={allocation} setEdit={setEdit} setReRender={setReRender} />
                    }
                  </ListItem>
                </>
              ))}
            </List>
          </>
          :
          <Typography> No allocations</Typography>
        }
      </Paper>
    </>
  )
}


function getAllocations(setAllocations: any) {
  loadDataFromFirebase("allocations")
    .then((res: any) => {
      if (res.hasOwnProperty("error")) {
        setAllocations([]);
      } else if (Object.keys(res).length > 0) {
        const allocations = Object.keys(res).map(key => res[key]);
        setAllocations(allocations);
      } else {
        console.log("empty response", res);
        setAllocations([]);
      }
    })
}

const AddAllocationWindow = ({ handleClose, setReRender }: any) => {
  const [allocationName, setAllocationName] = useState('');
  const [error, setError] = useState({ status: false, message: "" });

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



const handleSaveAllocation = ({ event, allocationName, setReRender, handleClose, setError }: any) => {
  event.preventDefault();
  // console.log(allocationName);
  if (allocationName === "") {
    setError({ status: true, message: "Allocation name can not be blank" });
    setTimeout(() => {
      setError({ status: false, message: "" });

    }, 2000)
  } else {

    saveAllocationIntoDb({ setReRender, allocationName });
    handleClose();
  }
}
