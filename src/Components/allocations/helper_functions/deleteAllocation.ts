import { updateDataInFirebase } from '../../../dataBaseUtils/readWrite';
import { AllocationType } from '../../../types';

export default async function deleteAllocation(allocation: AllocationType) {
  updateDataInFirebase(`allocations/${allocation.id}`, null).then(() => {
    return true;
  });
}
