import {Product} from "./ProductClass.js";
import { ref, get, child } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";

export class Products {
    constructor(db) {
        this.products = []
        get(child(ref(db), `products/`)).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                data.map((prod, i) => {
                    
                    this.products.push( (new Product(prod,i)).getInfo() )
                })
            }
          }).catch((error) => {
            console.error(error);
          });
          
    }

    getProducts() {
        return this.products;
    }
}
