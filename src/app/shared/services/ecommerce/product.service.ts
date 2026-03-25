import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { Products } from '../../../shared/model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  listData: Products[] | undefined;

  private http = inject(HttpClient);
  // Return list of products
  products(): Observable<Products[]> {
    return this.http.get<Products[]>('assets/data/product.json');
  }

  // Return a single product by ID
  public getProduct(id: number): Observable<Products | undefined> {
    return this.products().pipe(map((items: Products[]) => items.find(item => item.id === id)));
  }
}
