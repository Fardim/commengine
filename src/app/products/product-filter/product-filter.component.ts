import { WebapiCategoriesService } from './../../services/webapi-categories.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit{

  @Input('category') category;
  categories;
  constructor(private categoryService: WebapiCategoriesService) {
    
  }

  async ngOnInit() {
    this.categories = await this.categoryService.getCategories();
  }
}
