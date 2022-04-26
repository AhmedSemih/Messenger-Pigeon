import React from 'react';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Signup from './Pages/Signup/Signup';
import Signin from './Pages/Signin/Signin';
import Main from './Pages/Main/Main';
import {FirebaseApp} from './Firebase/firebase-config';
import {getAuth,onAuthStateChanged} from 'firebase/auth';
import {useUserContext} from './Contexts/UserContext';


function App() {

  const {user,setUser}=useUserContext();
  
  FirebaseApp();
  const auth=getAuth();
  onAuthStateChanged(auth,(user)=>{
     setUser(user);
  });

  return (
    <BrowserRouter>
        <Routes>
          <Route exact path='/' element={user != null ? <Main/> : <Signin/>}/>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Signin />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App