import { getAuth, createUserWithEmailAndPassword,sendEmailVerification} from "firebase/auth";
import {FirebaseApp} from './firebase-config.js';
import Swal from 'sweetalert2';

export const SignUp=(email,password,navigate)=>{

    FirebaseApp();
    const auth=getAuth();
    createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user=userCredential.user;
                sendEmailVerification(user);
                Swal.fire({
                    title: "Let's Start Chat!",
                    text: 'Account has been created and we sent you an email to officially join the club.',
                    icon: 'success',
                    confirmButtonText: "OK"
                  }).then(()=>{
                    navigate('/');
                  });
            })
            .catch(()=>{
                Swal.fire({
                title: 'Error!',
                text: 'This email already in use.',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            });
}