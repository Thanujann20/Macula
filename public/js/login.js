// import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js"
import {getAuth, updateProfile, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import { ref, set } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js';
import { app, db, auth } from "./firebase.js"
window.signIn = signIn;
window.signUp = signUp;


console.log(auth);


onAuthStateChanged(auth, async (user) => {
  if (user) {
    
    if(user.displayName) {
      alert(`You're already logged in ${user.displayName}!`)
    }
    await new Promise(r => setTimeout(r, 1000));
    window.location.href = "index.html";
  } else {
    // User is signed out
    // ...
    console.log("no one")
  }
});


export function signIn() {
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  
  signInWithEmailAndPassword(getAuth(app),email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;

      window.location.href = "index.html";

    })
    .catch((error) => {
      alert(error.message);
    });
}

export function signUp() {
  const firstname = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  if (firstname.value == "") {
    alert("You need to enter your first name to sign up!");
    return;
  }

  createUserWithEmailAndPassword(auth,email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      
      makeUserShell(user.uid, firstname.value);
      console.log(user);
      // ...
    })
    .catch((error) => {

      console.error(error);
    });
}

function makeUserShell(user, firstname) {

  set(ref(db, `users/${user}`), {
    username: firstname,
    orders: {
      quantity: 0,
      ids: ""
    },
    payment: {
      quantity: 0,
      ids: ""
    },
  });

  updateProfile(auth.currentUser, {
    displayName: firstname
  }).then(() => {
    console.log("display name added");
  }).catch((error) => {
    console.log(error);
  });


}
