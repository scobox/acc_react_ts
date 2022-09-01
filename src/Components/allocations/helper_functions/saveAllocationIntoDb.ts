import { loadDataFromFirebase, updateDataInFirebase } from '../../../dataBaseUtils/readWrite';
import findFreeAllocationId from './findFreeAllocationId';

export async function saveAllocationIntoDb(allocationName: string) {
  return new Promise((resolve, reject) => {
    loadDataFromFirebase('allocations').then((res: any) => {
      const freeAllocationSlot = findFreeAllocationId(res);
      updateDataInFirebase(`allocations/${freeAllocationSlot}`, { name: allocationName, id: freeAllocationSlot }).then(() => {
        resolve(true);
      });
    });
  });
}
