import { switchMap } from 'rxjs/operators';
import { Product } from './../../models/product';
import { WebapiProductsService } from './../../services/webapi-products.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;

  constructor(private productsService: WebapiProductsService) {
    
  }

  ngOnInit() {
    setTimeout(() => {
      this.productsService.getProductList().subscribe(p=>{
        this.filteredProducts = this.products = p;
      });
    }, 400);
  }

  filter(query:string){
    this.filteredProducts = (query)?
                            this.products.filter(d=> d.Title.toLowerCase().includes(query.toLowerCase())) :
                            this.products;
  }
}
