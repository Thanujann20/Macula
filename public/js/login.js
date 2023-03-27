// import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js"
import {onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import { auth } from "./firebase.js"
window.signIn = signIn;


onAuthStateChanged(auth, async (user) => {
  await new Promise(r => setTimeout(r, 400));
  if (user) {
    if(user.displayName) {
      alert(`You're already logged in ${user.displayName}!`)
    }
    window.history.back();
  }
});


export function signIn() {
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  
  signInWithEmailAndPassword(auth,email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert(error.message);
    });
}


