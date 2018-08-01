import { Product } from './product';
export class ShoppingCartItem {
    // product: Product;
    // quantity: number;
    Id: string;
    Title: string;
    ImageUrl: string;
    Price: number;
    quantity: number;
    
    constructor(init?: Partial<ShoppingCartItem>) {
        Object.assign(this, init);
    }
    get totalPrice() {
        return this.Price * this.quantity;
    }
}