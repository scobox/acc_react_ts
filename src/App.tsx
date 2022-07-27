import React from 'react';
import { loginToFirebaseWithEmailAndPassword } from './auth/authUtils';
import "./auth/firebaseInit.ts"

function App() {
	loginToFirebaseWithEmailAndPassword("", "");
	return (
		<div >
			App page
		</div>
	);
}

export default App;
