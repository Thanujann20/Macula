import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js"
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
import { Products } from "./classes/ProductsClass.js";
import { Account } from "./classes/AccountClass.js";


var firebaseConfig = {
  apiKey: "AIzaSyC57491UVElNoM9H0FDXXDdogkRr0cZv74",
  authDomain: "macula-a3ef8.firebaseapp.com",
  projectId: "macula-a3ef8",
  storageBucket: "macula-a3ef8.appspot.com",
  messagingSenderId: "849529666765",
  appId: "1:849529666765:web:6e9984e7919b7e3b66bd84"
};



export const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

export const auth = getAuth(app);

export const products = (new Products(db)).getProducts();

let curUser = null;

onAuthStateChanged(auth, (user) => {
  if (user) {
    curUser = user;
  } 

});

export async function getAccount() {
  const account = curUser ? (new Account(curUser, db)) : null;
  return account;
}

