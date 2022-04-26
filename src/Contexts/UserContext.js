import { createContext,useContext,useState} from "react";
import {FirebaseApp} from '../Firebase/firebase-config';
import { getAuth } from "firebase/auth";

const UserContext=createContext();

FirebaseApp();
const auth=getAuth();

export const UserProvider=({children})=>{

    const [user,setUser]=useState(auth.currentUser);

    const values={
        user,
        setUser,
    }

    return <UserContext.Provider value={values}>{children}</UserContext.Provider>
}

export const useUserContext=()=>useContext(UserContext);