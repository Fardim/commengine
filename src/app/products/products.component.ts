import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { WebapiProductsService } from './../services/webapi-products.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category;
  cart$: Observable<ShoppingCart>;
  constructor(private productsService: WebapiProductsService,
              private route: ActivatedRoute,
              private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProduct();
  }

  private populateProduct() {
    this.productsService.getProductList().pipe(switchMap(prod => {
      this.products = prod;
      return this.route.queryParamMap;
    })).subscribe(param => {
      this.category = param.get('category');
      this.applyFilter();
    });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
                            this.products.filter(p => p.CategoryId == this.category) :
                            this.products;
  }

}
