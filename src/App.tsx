import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import HomePage from "./Components/HomePage";
import LoginPage from "./Components/loginAndSignup/LoginPage";
import SignUpPage from "./Components/loginAndSignup/SignUpPage";
import "./dataBaseUtils/auth/firebaseInit.ts";
import { RoutePath } from "./types";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<RoutePath>(RoutePath.Login);
  const unauthorizedComponentsMap = {
    [RoutePath.Login]: LoginPage,
    [RoutePath.SignUp]: SignUpPage,
  };
  useEffect(() => {
    const isUser = Boolean(sessionStorage.getItem("user"));
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
  }, []);
  const UnauthorizedComponent = unauthorizedComponentsMap[currentPage];
  if (!signedIn)
    return <UnauthorizedComponent setSignedIn={setSignedIn} setCurrentPage={setCurrentPage} />;
  return <HomePage setSignedIn={setSignedIn} />;
}

export default App;
