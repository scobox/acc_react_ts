import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import HomePage from './Components/HomePage';
import LoginPage from './Components/loginAndSignup/LoginPage';
import SignUpPage from './Components/loginAndSignup/SignUpPage';
import "./dataBaseUtils/auth/firebaseInit.ts"

function App() {
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>("login");
  useEffect(() => {
    const isUser = sessionStorage.getItem('user');
    if (isUser) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setSignedIn(true);
        } else {
          sessionStorage.removeItem("user");
        }
      });
    }
  }, [])
  return (
    <div >
      {currentPage === "login" && (!signedIn ? <LoginPage setSignedIn={setSignedIn} setCurrentPage={setCurrentPage} /> : <HomePage setSignedIn={setSignedIn} />)}
      {currentPage === "signup" && (!signedIn ? <SignUpPage setSignedIn={setSignedIn} setCurrentPage={setCurrentPage} /> : <HomePage setSignedIn={setSignedIn} />)}
    </div>
  );
}

export default App;
