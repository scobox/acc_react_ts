import { Dispatch, SetStateAction } from "react";
import { loadDataFromFirebase } from "../../../dataBaseUtils/readWrite";
import { allocationType } from "../../../types";

function getAllocations(setAllocations: Dispatch<SetStateAction<allocationType[]>>) {
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

export default getAllocations;
