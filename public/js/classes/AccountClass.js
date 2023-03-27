import { Cart } from "./CartClass.js";
import { Orders } from "./OrdersClass.js";
import { Payment } from "./PaymentClass.js";
import { get, child, ref } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";

export class Account {
  constructor(user, db) {
    this.db = db;
    this.user = user;
    this.cart = new Cart(db, user.uid);
    this.orders = new Orders(db, user.uid);
    this.payment = null;
    this.findPayment(user.uid, db);
  }

  addToCart(prodId) {
    this.cart.addProduct(prodId);
  }

  createOrder() {
    this.orders.createOrder(this.cart.items, this.cart.total);
    this.cart.buyOutCart();
  }

  addPayment(nameOnCard, cardNumber, expiryDate, cvcNum) {

    this.payment = new Payment(nameOnCard, cardNumber, expiryDate, cvcNum, this.user.uid, this.db)

  }

  findPayment(uid, db) {
    get(child(ref(db), `payments/${uid}/`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        this.payment = new Payment(data.nameOnCard, data.cardNumber, data.expiry, data.cvc, uid, db)
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

}