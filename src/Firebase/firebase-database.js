import { getDatabase, ref, set } from "firebase/database";


export const addUserData=(userId,username,email)=>{
    const db = getDatabase();

    set(ref(db,'users/'+userId),{
        username:username,
        email:email
    });
}