import { getDatabase, ref, set } from "firebase/database";

export const writeIntoDataBase = (path: string, payload: any) => {
	console.log("test write");

	const db = getDatabase();
	const userId = sessionStorage.getItem("user");
	set(ref(db, 'users/' + userId + "/" + path), {
		test: payload
	});


}