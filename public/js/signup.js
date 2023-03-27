import { updateProfile, onAuthStateChanged, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import { ref, set } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js';
import { db, auth } from "./firebase.js"


window.signUp = signUp;




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


export function signUp() {
    const firstname = document.getElementById("name");
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
  
        alert(error);
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