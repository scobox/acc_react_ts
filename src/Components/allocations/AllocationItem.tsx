import { Button, Typography } from '@mui/material';
import { AllocationItemProps } from '../../types';
import deleteAllocation from './helper_functions/deleteAllocation';

const AllocationItem = (props: AllocationItemProps) => {
  const { allocation, setEdit, setReRender } = props;
  const handleAllocationDelete = () => {
    deleteAllocation(allocation).then(() => setReRender((prev) => prev + 1));
  };
  return (
    <>
      <Typography sx={{ width: '50%' }}>{allocation.name}</Typography>
      <Button variant='contained' sx={{ mr: 2, ml: 2 }} onClick={() => setEdit({ status: true, allocationId: allocation.id })}>
        Edit
      </Button>
      <Button variant='contained' onClick={handleAllocationDelete}>
        Delete
      </Button>
    </>
  );
};

export default AllocationItem;
