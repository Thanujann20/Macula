import { products, getAccount } from "../js/firebase.js"


window.addToCart = addToCart;


let account;


window.onload = async (event) => {
  await new Promise(r => setTimeout(r, 400));
  account = await Promise.resolve(getAccount());

  const greeting = document.getElementById("greeting");
  if (greeting) {
    greeting.innerHTML = (account ? `Welcome ${account.user.displayName}!` : "Welcome!")
  }
  await new Promise(r => setTimeout(r, 500));
  showProducts();
}

function showProducts() {

  const prodElement = document.getElementById("products");
  const path = window.location.pathname;

  products.map((prod) => {
    if ((prod.id <= 8 && path == "/index.html") || (prod.special && ((prod.special == "Arrivals" && path == "/arrivals.html") || (prod.special == "Fashion" && path == "/fashion.html")))) {
      prodElement.innerHTML += `
          <!-- card start-->
          <div class="card">
              <div class="img"><img src="images/${prod.imgFile}" alt=""></div>
              <div class="desc">${prod.desc}</div>
              <div class="title">${prod.title}</div>
              <div class="box">
                  <div class="price">$${prod.price}</div>
                  <button class="btn" onclick="addToCart(${prod.id})">Add to Cart</button>
              </div>
          </div>
          <!-- card end -->
        `;
    }
  })

}

export function addToCart(prodId) {
  if (!account) {
    alert("Will redirect you to login page!");
    window.location.href = "login.html";
  }

  account.addToCart(prodId);


}