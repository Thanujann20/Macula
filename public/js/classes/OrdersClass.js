import { ref, onValue, set, push, child } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
import { Order } from "./OrderClass.js";
export class Orders {
    constructor(db, uid) {
        
        this.db = db;
        this.uid = uid;
        this.orders = [];
        this.initiate();
    }

    initiate() {
        onValue(child(ref(this.db), `orders/${this.uid}/`), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                Object.keys(data).forEach((id) => {
                    const ord = data[id]
                    this.orders.push(new Order(id, ord.date, ord.items, ord.total))
                })
            }
        });
    }

    // cancelOrder(id) {
    //     172800000;
    // }

    createOrder(cartItems, total) {

        const orderDate = new Date();
        const orderListRef = ref(this.db, `orders/${this.uid}/`);
        const newOrderRef = push(orderListRef);

        const data = {
            date: orderDate.toISOString(),
            total: total,
            items: cartItems
        }

        set(newOrderRef, data);
        console.log("done");

    }
}