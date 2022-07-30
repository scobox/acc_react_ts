import React, { useState } from 'react';
import AddInvoiceElement from './Components/AddInvoiceElement';
import LoginPage from './Components/LoginPage';
import ModalWindow from './Components/ModalWindow';
import SignUpPage from './Components/SignUpPage';
import { cteateUserInFirebaseWithEmailAndPassword, loginToFirebaseWithEmailAndPassword, logoutFromFirebase } from './dataBaseUtils/auth/authUtils';
import "./dataBaseUtils/auth/firebaseInit.ts"
import { writeIntoDataBase } from './dataBaseUtils/readWrite';

function App() {
	const [signedIn, setSignedIn] = useState<boolean>(false);
	// loginToFirebaseWithEmailAndPassword("treex.lights@gmail.com", "123456");
	return (
		<div >
			{/* App page
			<button onClick={() => writeIntoDataBase("invoices", "test")}>test write</button>
			<button onClick={() => logoutFromFirebase()}>logout</button>
			<ModalWindow buttonText="testModal">
				<AddInvoiceElement></AddInvoiceElement>
			</ModalWindow>
			<ModalWindow buttonText="login">
				<LoginPage></LoginPage>
			</ModalWindow> */}
			{/* <LoginPage /> */}
			{!signedIn && <SignUpPage setSignedIn={setSignedIn} />}
		</div>
	);
}

export default App;
