import { Dispatch, SetStateAction } from "react";
import { loadDataFromFirebase, writeIntoDataBase } from "../../../dataBaseUtils/readWrite";
import findFreeAllocationId from "./findFreeAllocationId";

type Props = {
  allocationName: string;
  setReRender: Dispatch<SetStateAction<number>>;
}
export function saveAllocationIntoDb(props: Props) {
  loadDataFromFirebase("allocations").then((res: any) => {
    const freeAllocationSlot = findFreeAllocationId(res);
    writeIntoDataBase(`allocations/${freeAllocationSlot}`, { name: props.allocationName, id: freeAllocationSlot })
      .then(() => {
        props.setReRender(prev => prev + 1);
      })
  });
}
