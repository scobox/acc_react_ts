import { getDatabase, ref, set, get, child, update } from "firebase/database";
import { getAuth } from "firebase/auth";

export const writeIntoDataBase = (path: string, payload: any) => {
	return new Promise<any>((resolve, reject) => {

		const db = getDatabase();
		const userId = sessionStorage.getItem("user");
		set(ref(db, 'users/' + userId + "/" + path), payload)
			.then(() => {
				resolve(true);
			})
	})
}

export function loadDataFromFirebase(path = "") {
	// console.log(path);

	return new Promise((resolve, reject) => {

		const auth: any = getAuth();
		const userId = auth.currentUser.uid;

		const dbRef = ref(getDatabase());
		get(child(dbRef, `users/${userId}/${path}`)).then((snapshot) => {
			if (snapshot.exists()) {
				// console.log(snapshot.val());

				resolve(snapshot.val())
			} else {
				// console.log("No data available");
				resolve({})
			}
		}).catch((error) => {
			console.error(error);
			resolve({ error: "error" });
		});
	});
}


export function updateDataInFirebase(path = "", payload?: any) {

	return new Promise((resolve, reject) => {
		const auth: any = getAuth();
		const userId = auth.currentUser.uid;
		update(ref(getDatabase()), { [`users/${userId}/${path}`]: payload || null })
			.then(() => resolve(true))
			.catch(() => resolve(false))
	});
}
