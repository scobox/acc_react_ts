import { Dispatch, MouseEvent, SetStateAction } from "react";
import { errorType } from "../../../types";
import { saveAllocationIntoDb } from "./saveAllocationIntoDb";

type Props = {
  event: MouseEvent<HTMLButtonElement>,
  allocationName: string,
  setReRender: Dispatch<SetStateAction<number>>;
  handleClose: any,
  setError: Dispatch<SetStateAction<errorType>>;
}

const handleSaveAllocation = ({ event, allocationName, setReRender, handleClose, setError }: Props) => {
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

export default handleSaveAllocation;
