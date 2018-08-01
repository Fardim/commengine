import { Router, ActivatedRoute } from '@angular/router';
import { WebapiCategoriesService } from './../../services/webapi-categories.service';
import { WebapiProductsService } from './../../services/webapi-products.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from '../../../../node_modules/rxjs';
import { take } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  categories;
  product = {
    Title: '',
    ImageUrl: '',
    Price: 0,
    CategoryId: 0
  };
  id;
  updateSubscription: Subscription;
  createSubscription: Subscription;
  deleteSubscription: Subscription;
  constructor(private productsService: WebapiProductsService,
              private categoryService: WebapiCategoriesService,
              private router: Router,
              private route: ActivatedRoute) { 

  }

  async ngOnInit() {
    this.categories = await this.categoryService.getCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.product = await this.productsService.get(this.id);
      console.log(this.product);
    }
  }

  save(product) {
    if (this.id) {
      this.updateSubscription = this.productsService.update(this.id, product).pipe(take(1)).subscribe(x => x);
    } else {
      this.createSubscription = this.productsService.create(product).pipe(take(1)).subscribe(x => x);
    }

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are u sure u want to delete the product?')) {
      return;
    }
    this.deleteSubscription =this.productsService.delete(this.id).pipe(take(1)).subscribe(x => x);
    this.router.navigateByUrl('/admin/products');
  }

  ngOnDestroy(){
  }
}
