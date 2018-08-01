import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebapiCategoriesService {

  items: any[];
  constructor(private http: HttpClient) { }

  getCategories(){
    return this.http.get('http://localhost:19339/api/CommEngine/GetCategories').pipe(map((data : any[]) =>{
      return data;
    })).toPromise().then(x => {
      this.items = x;
      return this.items;
    });
  }
}
