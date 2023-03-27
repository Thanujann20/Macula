import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js"
import { auth, getAccount } from './firebase.js';


window.addPayment = addPayment;
window.makeOrder = makeOrder;
let account;

window.onload = async (event) => {
    await new Promise(r => setTimeout(r, 400));
    account = await Promise.resolve(getAccount());
    await new Promise(r => setTimeout(r, 400));

    const container = document.getElementById("form-container");
    if (account.payment) {
        showPayment(container);
    } else {
        showForm(container);
    }
}

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        alert("Will redirect you to login page!");
        window.location.href = "login.html";
    }

})

function showForm(container) {

    container.innerHTML += `
        <form class="checkout-form" onsubmit="">
            <div class="input-line">
                <label for="name">Name On Card</label>
                <input type="text" name="name" id="name" placeholder="Your name and surname" required>
            </div>
            <div class="input-line">
                <label for="card">Card Number</label>
                <input type="text" pattern="[0-9]{4}-?[0-9]{4}-?[0-9]{4}-?[0-9]{4}" name="card" placeholder="1111-2222-3333-4444" id="card" required>
            </div>
            <div class="input-container">
                <div class="input-line">
                    <label for="expiry">Expiry Date</label>
                    <input type="date" name="expiry" min="2023-05-01" placeholder="09-21" id="expiry" required>
                </div>
                <div class="input-line">
                    <label for="cvc">CVC</label>
                    <input type="text" name="cvc" pattern="[0-9]{3}" id="cvc" placeholder="***" id="cvc" required>
                </div>
            </div>

            <button type="submit" id="paymentSubmit" onclick="addPayment()">Add Payment</button>
        </form>
    `;
}

function showPayment(container) {
    const payment = account.payment;

    container.innerHTML += `
    <h3 class="">Payment is on file!</h3>
    <h4>Card ending in ****${payment.cardNumber.substring(12)} with expiry ${payment.expiry}</h4>
    <h4>Order total is: ${account.cart.total}</h4>
    <br>
    <br>
    <button id="paymentSubmit" onclick="makeOrder()">Order</button>
    
    `;
}

export function makeOrder() {
    console.log("ordered");
    account.createOrder();
    window.location.href = "orders.html";
}

export function addPayment() {
    console.log(account)
    const name = document.getElementById("name").value;
    const card = document.getElementById("card").value;
    const expiry = document.getElementById("expiry").value;
    const cvc = document.getElementById("cvc").value;

    card.replaceAll('-', "");
    const dateObj = new Date(expiry)
    const date = `${dateObj.getMonth()}-${dateObj.getFullYear() - 2000}`

    if (date == "" || name == "" || card == "" || cvc == "") {
        return;
    }

    account.addPayment(name, card, date, cvc);
}

