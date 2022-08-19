import { Dispatch, SetStateAction } from "react";
import { updateDataInFirebase } from "../../../dataBaseUtils/readWrite";

type AllocationType = {
  name: string;
  id: number
};

export default function deleteAllocation(allocation: AllocationType, setReRender: Dispatch<SetStateAction<number>>): void {
  updateDataInFirebase(`allocations/${allocation.id}`)
    .then(() => {
      setReRender(prev => prev + 1);
    });
}
