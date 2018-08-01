import { Product } from './product';
import { ShoppingCartItem } from './shoppingCart-item';
export class ShoppingCart {

    items: ShoppingCartItem[] = []; // to avoid null reference exception
    constructor(private itemsMap: {[productId: string]: ShoppingCartItem}) {
        this.itemsMap = itemsMap || {};

        for(let productId in itemsMap) {
            if (productId) {
                let item = itemsMap[productId];
                let x = new ShoppingCartItem({
                    ...item,
                    Id: productId
                });
                this.items.push(x);
                // this.items.push(new ShoppingCartItem(item.product, item.quantity));
            }
        }
    }

    get totalPrice(){
        let sum = 0;
        for(let productId in this.items){
            if(productId){
                sum += this.items[productId].totalPrice;
            }
        }
        return sum;
    }

    // get productIds() {
    //     return Object.keys(this.items);
    // }

    getQuantity(product: Product) {
        let item = this.itemsMap[product.Id];
        return item ? item.quantity : 0;
    }

    get totalItemsCount(){
        let shoppingCartItemCount = 0;
        for(let productId in this.itemsMap) {
            if (productId) {
                shoppingCartItemCount += this.itemsMap[productId].quantity;
            }
        }
        return shoppingCartItemCount;
    }
}
