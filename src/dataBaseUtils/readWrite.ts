import { getDatabase, ref, get, child, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';

export function loadDataFromFirebase(path = '') {
  return new Promise((resolve, reject) => {
    const auth: any = getAuth();
    const userId = auth.currentUser.uid;

    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}/${path}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          resolve(snapshot.val());
        } else {
          resolve({});
        }
      })
      .catch((error) => {
        console.error(error);
        resolve({ error: 'error' });
      });
  });
}

export function updateDataInFirebase(path = '', payload?: any) {
  return new Promise((resolve, reject) => {
    const auth: any = getAuth();
    const userId = auth.currentUser.uid;
    update(ref(getDatabase()), { [`users/${userId}/${path}`]: payload || null })
      .then(() => {
        resolve(true);
      })
      .catch(() => resolve(false));
  });
}
