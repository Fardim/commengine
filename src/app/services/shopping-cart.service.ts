import { Product } from './../models/product';
import { ShoppingCartItem } from './../models/shoppingCart-item';
import { async } from '@angular/core/testing';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }


  async addToCart(product: Product) {
    this.updateItem(product, 1);
    // let cartId = await this.getOrCreateCartId();
    // let items$ = this.getItem(cartId, product.key);
    // items$.valueChanges().pipe(take(1)).subscribe((item: ShoppingCartItem) => {
    //   items$.update({product: product, quantity: (item ? item.quantity : 0) + 1});
    //   // if(item) {
    //   //   console.log(item);
    //   //   items$.update({quantity: item.quantity + 1});
    //   // } else{
    //   //   console.log('items not exist');
    //   //   items$.set({product: product, quantity: 1});
    //   // }
    // });
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges()
      .pipe(map((x: any) => new ShoppingCart(x.items)));
    // let iss = this.db.object('/shopping-carts/' + cartId).valueChanges();
    // iss.subscribe(d=> console.log(d));
    // return iss.pipe(map((x: any) => new ShoppingCart(x.items)));
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let items$ = this.getItem(cartId, product.Id);
    items$.valueChanges().pipe(take(1)).subscribe((item: ShoppingCartItem) => {
      let quantity = (item ? item.quantity : 0) + change;
      if (quantity <= 0) {
        items$.remove();
      } else {
        items$.update({
          // product: product,
          Title: product.Title,
          ImageUrl: product.ImageUrl,
          Price: product.Price,
          quantity: quantity
        });
      }
    });
  }

  private getItem(cartId: string, productId: number) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }
  
  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
    // this.create().then(result => {
    //   localStorage.setItem('cartId', result.key);
    //   return this.getCart(result.key);
    // });
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated : new Date().getTime()
    });
  }
}
