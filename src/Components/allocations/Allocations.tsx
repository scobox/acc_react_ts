import { List, ListItem, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { AllocationType, EditType } from "../../types";
import ModalWindow from "../ModalWindow";
import AddAllocationWindow from "./AddAllocationWindow";
import AllocationItem from "./AllocationItem";
import AllocationItemEditable from "./AllocationItemEditable";
import getAllocations from "./helper_functions/getAllocations";

export default function Allocations() {
  const [allocations, setAllocations] = useState<AllocationType[]>([]);
  const [reRender, setReRender] = useState(0);
  const [edit, setEdit] = useState<EditType>({ status: false, allocationId: undefined });
  useEffect(() => {
    getAllocations().then((res: any) => setAllocations(res));
  }, [reRender]);

  return (
    <>
      <Paper sx={{ p: 2, m: 1 }}>
        <ModalWindow buttonText='Add new allocation'>
          <AddAllocationWindow handleClose setReRender={setReRender} />
        </ModalWindow>
      </Paper>
      <Paper sx={{ p: 2, m: 1 }}>
        {allocations.length ? (
          <List sx={{ width: "100%", maxWidth: 660, bgcolor: "background.paper" }}>
            {allocations.map(
              (allocation) =>
                allocation.id !== 0 && (
                  <ListItem key={allocation.name}>
                    {edit.status && edit.allocationId === allocation.id ? (
                      <AllocationItemEditable
                        allocation={allocation}
                        setEdit={setEdit}
                        setReRender={setReRender}
                      />
                    ) : (
                      <AllocationItem
                        allocation={allocation}
                        setEdit={setEdit}
                        setReRender={setReRender}
                      />
                    )}
                  </ListItem>
                )
            )}
          </List>
        ) : (
          <Typography> No allocations</Typography>
        )}
      </Paper>
    </>
  );
}
