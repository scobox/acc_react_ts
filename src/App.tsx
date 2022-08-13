import React, { useState } from 'react';
// import AddInvoiceElement from './Components/AddInvoiceElement';
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import ModalWindow from './Components/ModalWindow';
import SignUpPage from './Components/SignUpPage';
import { cteateUserInFirebaseWithEmailAndPassword, loginToFirebaseWithEmailAndPassword, logoutFromFirebase } from './dataBaseUtils/auth/authUtils';
import "./dataBaseUtils/auth/firebaseInit.ts"
import { writeIntoDataBase } from './dataBaseUtils/readWrite';

function App() {
	const [signedIn, setSignedIn] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<string>("login");
	// loginToFirebaseWithEmailAndPassword("treex.lights@gmail.com", "123456");
	return (
		<div >
			{currentPage === "login" && (!signedIn ? <LoginPage setSignedIn={setSignedIn} setCurrentPage={setCurrentPage} /> : <HomePage setSignedIn={setSignedIn} />)}
			{currentPage === "signup" && (!signedIn ? <SignUpPage setSignedIn={setSignedIn} setCurrentPage={setCurrentPage} /> : <HomePage setSignedIn={setSignedIn} />)}
		</div>
	);
}

export default App;
