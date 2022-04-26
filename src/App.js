import React from 'react';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Signup from './Components/Signup/Signup';
import Signin from './Components/Signin/Signin';
import Main from './Components/Main/Main';
import {FirebaseApp} from './Firebase/firebase-config';
import {getAuth,onAuthStateChanged} from 'firebase/auth';
import {useUserContext} from './Contexts/UserContext';

function App() {

  const {setUser}=useUserContext();

  FirebaseApp();
  const auth=getAuth();
  onAuthStateChanged(auth,(user)=>{
     setUser(user);
  });

  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Signin />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App