export class Product {
    constructor({ title, desc, imgFile, price, special = null }, id) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.price = price;
        this.imgFile = imgFile;
        this.special = special;
    }
    toString() {
        return `${this.id}: ${this.title}`;
    }
    getInfo() {
        return {
            id : this.id,
            title : this.title,
            desc : this.desc,
            price : this.price,
            imgFile : this.imgFile,
            special : this.special,
        };
    }
}