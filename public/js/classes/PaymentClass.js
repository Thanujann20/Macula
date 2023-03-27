import {set,ref} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
export class Payment {
    constructor(nameOnCard,cardNum, expiry, cvc, uid, db) {
        this.name = nameOnCard;
        this.cardNumber = cardNum;
        this.expiry = expiry;
        this.cvc = cvc;
        this.addPayment(uid,db);
    }

    addPayment(uid,db) {
        const data = {
            nameOnCard: this.name,
            cardNumber: this.cardNumber,
            expiry: this.expiry,
            cvc: this.cvc
        }
        set(ref(db, `payments/${uid}/`), data);
    }

}