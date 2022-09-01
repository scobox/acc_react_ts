import { updateDataInFirebase } from '../../../dataBaseUtils/readWrite';
import { AllocationType } from '../../../types';
/*
Firebase DB converts object into array in case if first saved key is numerical even if it has "string" type in JS.
To overcome the issue this function saves first key as "zero" to initiate the data structure as an object, not as an array.
*/
const findFreeAllocationId = (allocations: { [name: string]: AllocationType }) => {
  const allocationsKeys = Object.keys(allocations);
  const idArrayLength = allocationsKeys.length;
  if (idArrayLength === 0) {
    updateDataInFirebase('allocations', { zero: { id: 0, name: 'unallocated' } });
    return 1;
  }
  if (idArrayLength === 1) return 1;
  if (idArrayLength >= 2) {
    const zeroIndex = allocationsKeys.findIndex((el) => el === 'zero');
    if (zeroIndex > -1) allocationsKeys[zeroIndex] = '0';

    const allocationsKeysNumbers = allocationsKeys.map((el) => Number(el));
    allocationsKeysNumbers.sort((a: number, b: number) => a - b);

    let idArrayIndex = 1;
    do {
      if (allocationsKeysNumbers[idArrayIndex] !== idArrayIndex) return idArrayIndex;
      idArrayIndex++;
    } while (idArrayIndex < idArrayLength);
    return idArrayIndex;
  }
};

export default findFreeAllocationId;
