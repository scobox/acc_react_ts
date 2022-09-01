import { handleSaveAllocationProps } from '../../../types';
import { saveAllocationIntoDb } from './saveAllocationIntoDb';

const handleSaveAllocation = async ({ event, allocationName }: handleSaveAllocationProps) => {
  event.preventDefault();
  return new Promise((resolve, reject) => {
    if (allocationName === '') {
      resolve(false);
    } else {
      saveAllocationIntoDb(allocationName).then(() => {
        resolve(true);
      });
    }
  });
};

export default handleSaveAllocation;
