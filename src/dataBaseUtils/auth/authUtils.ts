import { browserSessionPersistence, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, setPersistence, signInWithEmailAndPassword } from "firebase/auth";

export const loginToFirebaseWithEmailAndPassword = async (email: string, password: string) => {
	return new Promise((resolve, reject) => {


		const auth = getAuth();
		console.log(auth);

		setPersistence(auth, browserSessionPersistence)
			.then(() => {
				// Existing and future Auth states are now persisted in the current
				// session only. Closing the window would clear any existing state even
				// if a user forgets to sign out.
				return signInWithEmailAndPassword(auth, email, password);
			})
			.then((userCredential) => {
				// Signed in 
				console.log("login successful", userCredential);

				sessionStorage.setItem('user', userCredential.user.uid);
				resolve(true);

				onAuthStateChanged(auth, (user) => {
					if (user) {
						// User is signed in
						// ...
					} else {
						// User is signed out
						// ...
						sessionStorage.removeItem("user");
					}
				});

				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode);
				console.log(errorMessage);
				resolve(false);
			});
	})
}



export async function cteateUserInFirebaseWithEmailAndPassword(email: string, password: string) {
	return new Promise((resolve, reject) => {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				sessionStorage.setItem('user', userCredential.user.uid);
				resolve(true)
			})
			.catch((error) => {
				// const errorCode = error.code;
				// const errorMessage = error.message;
				// console.log(errorCode, errorMessage);
				resolve(false);
			});
	})
}