// Import the functions you need from the SDKs you need
import { ref, get, child } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
import {  onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js"
import { app, db, auth } from "./firebase.js"

window.addToCart = addToCart;

const dbRef = ref(db);
var curUser = null;
onAuthStateChanged(auth, (user) => {
  if (user) {
    curUser = user;
    console.log(curUser);
  } else {
    // User is signed out
    // ...
    console.log("no one")
  }
});

window.onload = (event) => {
  showProducts();
}

function showProducts() {

  get(child(dbRef, `products/`)).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const prodElement = document.getElementById("products");
      data.map((prod,i) => {
        if( i <= 8 ) {
          prodElement.innerHTML += `
          <!-- card start-->
          <div class="card">
              <div class="img"><img src="images/${prod.imgFile}" alt=""></div>
              <div class="desc">${prod.desc}</div>
              <div class="title">${prod.title}</div>
              <div class="box">
                  <div class="price">$${prod.price}</div>
                  <button class="btn" onclick="addToCart(${i})">Add to Cart</button>
              </div>
          </div>
          <!-- card end -->
        `;
        }
      })

    } else {
      console.log("No data available");
    }
}).catch((error) => {
  console.error(error);
});
}

export function addToCart(prodId) {
  if(!curUser){
    alert("Will redirect you to login page!");
    window.location.href = "login.html";
  }
  console.log("added to cart");
}