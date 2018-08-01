import { map, catchError } from 'rxjs/operators';
import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { throwError } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebapiProductsService {

  productList : Product[];
  selectedProduct : Product;
  headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  getProductList(){
    return this.http.get('http://localhost:19339/api/CommEngine/GetProducts').pipe(map((data : Product[]) =>{
      return this.productList = data;
    }));
  }

  get(productId){
    return this.http.get('http://localhost:19339/api/CommEngine/GetProduct/'+productId).pipe(map((data : Product) =>{
      return data;
    })).toPromise().then(x => {
      this.selectedProduct = x;
      return this.selectedProduct;
    });
  }

  create(product: Product){
    console.log(product);
    let response = this.http.post('http://localhost:19339/api/CommEngine/PostProduct',product);
    return response;
  }
  
  update(productId, product){
    let response = this.http.put('http://localhost:19339/api/CommEngine/PutProduct/'+productId,product);
    return response;
  }

  delete(productId){
    let response = this.http.delete('http://localhost:19339/api/CommEngine/DeleteProduct/'+productId);
    return response;
  }

  private handleError(error :Response){
    return throwError(new Error());
  }
}
