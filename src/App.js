import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import {FirebaseApp} from './Firebase/firebase-config';
import {getAuth,onAuthStateChanged} from 'firebase/auth';
import {useUserContext} from './Contexts/UserContext';
import {LargeScreenRoute,SmallScreenRoute} from './RouteForScreens';

function App() {
  const {user,setUser}=useUserContext();
  const screenWidth=window.innerWidth;
  
  FirebaseApp();
  const auth=getAuth();
  onAuthStateChanged(auth,(user)=>{
     setUser(user);
  });

  return (
    <BrowserRouter>
        {screenWidth > 899 ? <LargeScreenRoute user={user} /> : <SmallScreenRoute user={user} />}
    </BrowserRouter>
  )
}

export default App