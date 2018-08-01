import { ShoppingCartService } from './../services/shopping-cart.service';
import { ShoppingCart } from './../models/shopping-cart';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  constructor(private shoppigCartService: ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart() {
    this.shoppigCartService.addToCart(this.product);
  }

  removeFromCart() {
    this.shoppigCartService.removeFromCart(this.product);
  }
}
