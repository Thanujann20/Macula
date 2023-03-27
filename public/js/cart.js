import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import { db, auth, products } from "./firebase.js"
import { Cart } from "./classes/CartClass.js";

window.removeFromCart = removeFromCart;

let curUser = null;
let cart = null;

onAuthStateChanged(auth, async (user) => {
    if (user) {
        curUser = user;
        cart = new Cart(db,user.uid);
        await new Promise(r => setTimeout(r, 400));
        showCart();
    } else {
        alert("Will redirect you to login page!");
        window.location.href = "login.html";
    }
});


function showCart() {
    const cartElement = document.getElementById("shop");
    cartElement.innerHTML = "";
    let subTotal = 0;
    if (cart.getCart()) {
        Object.keys(cart.getCart()).forEach((id) => {
            const prod = products[id-1];
            subTotal += (prod.price * cart.getCart()[id]);
            cartElement.innerHTML += `
            <div class="box">
                <img src="../images/${prod.imgFile}">
                <div class="content">
                    <h3>${prod.title}</h3>
                    <h4>Price: $${prod.price}</h4>
                    <p class="unit">Quantity: ${cart.getCart()[id]}</p>
                    <p class="btn-area" onclick="removeFromCart(${id})"><i aria-hidden="true" class="fa fa-trash"></i> <span class="btn2">Remove</span></p>
                </div>
            </div>
            `;
        });

    } else {
        cartElement.innerHTML = `
        <div class="box">
            <img src="../images/no-record.png">
            <div class="content">
                <h3>No records found</h3>
            </div>
        </div>
        `;
    }

    showTotal(subTotal);
}

function showTotal(subTotal) {
    const infoBar = document.getElementById("checkoutInfo");
    
    const tax = parseFloat((subTotal * 0.13).toFixed(2));
    var shipping = 15;
    if (subTotal == 0) {
        shipping = 0;
    }
    const total = (subTotal + shipping + tax).toFixed(2);

    cart.setTotal(total);
    infoBar.innerHTML = "";
    infoBar.innerHTML += `
        <p><span>Subtotal</span> <span>$${subTotal}</span></p>
        <hr>
        <p><span>Tax (13%)</span> <span>$${tax}</span></p>
        <hr>
        <p><span>Shipping</span> <span>$${shipping}</span></p>
        <hr>
        <p><span>Total</span> <span>$${total}</span></p>
        
        <a href="${total == 0 ? '#' : 'payment.html'}"><i class="fa fa-shopping-cart"></i>Checkout</a>
        <a href="orders.html"><i class="fa fa-shopping-cart"></i>View Previous Orders</a>
    `;
}

export async function removeFromCart(id) {
    cart.removeProduct(id);
    showCart();
}

