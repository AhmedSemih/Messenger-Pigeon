import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseApp } from './firebase-config.js';
import Swal from 'sweetalert2';
import { addUserData } from './firebase-database';



export const SignUp = (email, password, username, navigate) => {

  FirebaseApp();
  const auth = getAuth();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      sendEmailVerification(user);
      addUserData(user.uid, username, email);
      Swal.fire({
        title: "Let's Start Chat!",
        text: 'Account has been created and we sent you an email to officially join the club.',
        icon: 'success',
        confirmButtonText: "OK"
      }).then(() => {
        navigate('/');
      });
    })
    .catch(() => {
      Swal.fire({
        title: 'Error!',
        text: 'This email already in use.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
}

export const Login = (email, password, navigate) => {

  FirebaseApp();
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      navigate('/');
    })
    .catch(() => {
      Swal.fire({
        title: 'Error!',
        text: 'Wrong email or password.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
}