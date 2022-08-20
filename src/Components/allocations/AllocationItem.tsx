import { Button, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { allocationType, editType } from "../../types";
import deleteAllocation from "./helper_functions/deleteAllocation";

type Props = {
  allocation: allocationType;
  setEdit: Dispatch<SetStateAction<editType>>;
  setReRender: Dispatch<SetStateAction<number>>;
}

const AllocationItem = (props: Props) => {
  const { allocation, setEdit, setReRender } = props;
  return (
    <>
      <Typography sx={{ width: "50%" }}>{allocation.name}</Typography>
      <Button variant="contained" sx={{ mr: 2, ml: 2 }} onClick={() => setEdit({ status: true, allocationId: allocation.id })}>Edit</Button>
      <Button variant="contained" onClick={() => deleteAllocation(allocation, setReRender)}>Delete</Button>
    </>
  )
}

export default AllocationItem;
