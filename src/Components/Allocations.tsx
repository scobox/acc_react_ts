import { Button, FormControl, IconButton, List, ListItem, ListItemText, Paper, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { loadDataFromFirebase, updateDataInFirebase, writeIntoDataBase } from '../dataBaseUtils/readWrite'
import ModalWindow from './ModalWindow';

interface editIntfs {
	status: boolean;
	allocationId: number | undefined;
}

export default function Allocations() {
	const [allocations, setAllocations] = useState<any[]>([]);
	const [reRender, setReRender] = useState(0);
	const [edit, setEdit] = useState<editIntfs>({ status: false, allocationId: undefined });
	useEffect(() => {
		getAllocations(setAllocations);
	}, [reRender]);

	const deleteAllocation = (allocation: any) => {
		// console.log(`allocations/${allocation.id}`);
		updateDataInFirebase(`allocations/${allocation.id}`);
		setReRender(prev => prev + 1);
	}
	const editAllocation = (allocation: any) => {
		// console.log(allocation);
		setEdit({ status: true, allocationId: allocation.id });
	}
	const handleAllocationChange = (event: any, id: number) => {
		console.log(event.target.value, id);
		const newAllocations = allocations;
		newAllocations[id - 1].name = event.target.value;
		console.log(newAllocations);
		setAllocations(newAllocations);
	}

	const AllocationItemEditable = ({ allocation }: any) => {
		const [allocationName, setAllocationName] = useState(allocation.name);
		const handleAllocationNameChange = (event: any) => {
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
				/>
				<Button variant="contained" sx={{ mr: 2, ml: 2 }} onClick={handleAllocationNameSave}>Save</Button>
				<Button variant="contained" onClick={() => setEdit({ status: false, allocationId: undefined })}>Cancel</Button>
			</>
		)
	}
	const AllocationItem = ({ allocation }: any) => {
		console.log(allocation);

		return (
			<>
				<Typography sx={{ width: "50%" }}>{allocation.name}</Typography>
				<Button variant="contained" sx={{ mr: 2, ml: 2 }} onClick={() => editAllocation(allocation)}>Edit</Button>
				<Button variant="contained" onClick={() => deleteAllocation(allocation)}>Delete</Button>
			</>
		)
	}

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
										key={allocation.id}
									>
										{(edit.status && edit.allocationId === allocation.id) ?
											// <TextField
											//   value={allocation.name}
											//   sx={{ width: "50%", pr: 2 }}
											//   onChange={(event) => { handleAllocationChange(event, allocation.id) }}
											// />
											<AllocationItemEditable allocation={allocation} />
											:
											<AllocationItem allocation={allocation} />
											// <ListItemText primary={allocation.name} />
										}
										{/* <Button variant="contained" sx={{ mr: 2 }} onClick={() => editAllocation(allocation)}> */}
										{/* {(edit.status && edit.allocationId === allocation.id) ? "Save" : "Edit"
                      }
                    </Button>
                    {
                      (!edit.status && edit.allocationId !== allocation.id) ?
                        
                        :
                        <Button variant="contained" onClick={() => setEdit({ status: false, allocationId: undefined })}>Cancel</Button>
                    } */}
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

type allocationDataType = {
	setReRender: any,
	allocationName: any

}

function saveAllocationIntoDb(props: allocationDataType) {
	loadDataFromFirebase("allocations").then((res: any) => {
		const freeAllocationSlot = findFreeAllocationId(res);
		writeIntoDataBase(`allocations/${freeAllocationSlot}`, { name: props.allocationName, id: freeAllocationSlot })
			.then(() => {
				props.setReRender((prev: number) => prev + 1);
			})
	});

	const findFreeAllocationId = (allocations: object) => {
		const allocationsKeys = Object.keys(allocations);
		const idArrayLength = allocationsKeys.length;
		if (idArrayLength === 0) {
			writeIntoDataBase("allocations", { "zero": { id: 0, name: "unallocated" } });
			return 1;
		}
		if (idArrayLength === 1) return 1;
		if (idArrayLength >= 2) {
			const zeroIndex = allocationsKeys.findIndex(el => el === "zero");

			if (zeroIndex > -1) allocationsKeys[zeroIndex] = "0";

			const allocationsKeysNumbers = allocationsKeys.map(el => Number(el));
			allocationsKeysNumbers.sort((a: any, b: any) => a - b);

			let idArrayIndex = 1;
			do {
				if (allocationsKeysNumbers[idArrayIndex] !== idArrayIndex) return idArrayIndex;
				idArrayIndex++;
			}
			while (idArrayIndex < idArrayLength)
			return idArrayIndex;
		}
	}
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



