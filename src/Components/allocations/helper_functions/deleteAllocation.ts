import { Dispatch, SetStateAction } from "react";
import { updateDataInFirebase } from "../../../dataBaseUtils/readWrite";
import { allocationType } from "../../../types";

export default function deleteAllocation(allocation: allocationType, setReRender: Dispatch<SetStateAction<number>>): void {
  updateDataInFirebase(`allocations/${allocation.id}`, null)
    .then(() => {
      setReRender(prev => prev + 1);
    });
}
