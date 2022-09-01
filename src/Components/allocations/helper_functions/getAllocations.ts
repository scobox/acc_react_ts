import { loadDataFromFirebase } from '../../../dataBaseUtils/readWrite';
import { AllocationType } from '../../../types';

function getAllocations() {
  return new Promise((resolve) => {
    loadDataFromFirebase('allocations').then((res: any) => {
      if (res.hasOwnProperty('error')) {
        resolve([] as AllocationType[]);
      } else if (Object.keys(res).length > 0) {
        const allocations = Object.keys(res).map((key) => res[key]);
        resolve(allocations as AllocationType[]);
      } else {
        console.log('empty response', res);
        resolve([] as AllocationType[]);
      }
    });
  });
}

export default getAllocations;
