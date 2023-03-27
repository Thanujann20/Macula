import { db, auth, products } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import { Orders } from "./classes/OrdersClass.js";


onAuthStateChanged(auth, async (user) => {
    if (user) {
        const orders = new Orders(db,user.uid);
        await new Promise(r => setTimeout(r, 500));
        showOrders(orders, products);
    } else {
        alert("Will redirect you to login page!");
        window.location.href = "login.html";
    }
});

function showOrders(OrderCollection, products) {
    const element = document.getElementById("products");
    const orders =  OrderCollection.orders;
    
    orders.map((ord) => {
        let innerItems = ""
        Object.keys(ord.items).forEach((id) => {
            innerItems += `<div class="price orderItems"><strong>${products[id-1].title}:</strong>  ${ord.items[id]}</div>`
        });
        element.innerHTML += `
        <div class="card">
            <div class="title">Ordered on: ${ord.date.substring(0,10)}</div>
            <h3 class="desc">Total: $${ord.total}</h3>
            <h4 class="desc">Items: </h4>
            <br>
            ${innerItems}
            <br>
        </div>
        `;
    })
}