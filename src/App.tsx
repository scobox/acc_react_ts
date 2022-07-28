import React from 'react';
import AddInvoiceElement from './Components/AddInvoiceElement';
import ModalWindow from './Components/ModalWindow';
import { cteateUserInFirebaseWithEmailAndPassword, loginToFirebaseWithEmailAndPassword } from './dataBaseUtils/auth/authUtils';
import "./dataBaseUtils/auth/firebaseInit.ts"
import { writeIntoDataBase } from './dataBaseUtils/readWrite';

function App() {

	loginToFirebaseWithEmailAndPassword("treex.lights@gmail.com", "123456");
	return (
		<div >
			App page
			<button onClick={() => writeIntoDataBase("invoices", "test")}>test write</button>
			<ModalWindow buttonText="testModal">
				<AddInvoiceElement></AddInvoiceElement>
			</ModalWindow>
		</div>
	);
}

export default App;
