import { Button, TextField } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { updateDataInFirebase } from "../../dataBaseUtils/readWrite";
import { allocationType, editType } from "../../types";

type Props = {
  allocation: allocationType;
  setEdit: Dispatch<SetStateAction<editType>>;
  setReRender: Dispatch<SetStateAction<number>>;
}

const AllocationItemEditable = (props: Props) => {
  const { allocation, setEdit, setReRender } = props;
  const [allocationName, setAllocationName] = useState<string>(allocation?.name || "");
  const handleAllocationNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAllocationName(event.target.value)
  }
  const handleAllocationNameSave = () => {
    updateDataInFirebase(`allocations/${allocation.id}/name`, allocationName)
      .then(() => {
        setEdit({ status: false, allocationId: undefined });
        setReRender(prev => prev + 1);
      })
  }
  return (
    <>
      <TextField
        sx={{ width: "50%" }}
        value={allocationName}
        onChange={handleAllocationNameChange}
        autoFocus
      />
      <Button variant="contained" sx={{ mr: 2, ml: 2 }} onClick={handleAllocationNameSave}>Save</Button>
      <Button variant="contained" onClick={() => setEdit({ status: false, allocationId: undefined })}>Cancel</Button>
    </>
  )
}

export default AllocationItemEditable;
