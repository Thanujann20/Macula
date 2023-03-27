import { ref, set, child, onValue } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js';


export class Cart {
    constructor(db,uid) {
        this.id = uid;
        this.db = db;
        this.items = null;
        this.total=null;
        this.initiate();
    }

    initiate() {

        onValue(child(ref(this.db), `carts/${this.id}/`), (snapshot) => {
            if (snapshot.exists()) {
                this.items = snapshot.val().items;
                this.total = snapshot.val().total;
            }
        });
        
    }

    removeProduct(prodId) {

        delete this.items[prodId];
        set(ref(this.db, `carts/${this.id}/items/${prodId}`), null);
        
    }

    addProduct(prodId) {

        if(!this.items){
            this.items = {};
        }
        if (!this.items[prodId]) {
            this.items[prodId] = 0;
        }

        this.items[prodId] += 1
        set(ref(this.db, `carts/${this.id}/items/${prodId}`), this.items[prodId]);
        alert(`Added the product to cart!\nQuantity: ${this.items[prodId]}`)

    }

    getCart() {
        return this.items;
    }

    setTotal(total){
        set(ref(this.db, `carts/${this.id}/total`), total);
    }

    buyOutCart() {
        set(ref(this.db, `carts/${this.id}/`), null);
    }
}