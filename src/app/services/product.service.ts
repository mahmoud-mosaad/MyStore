import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getProductsData(): Observable<Product[]> {
      return this.http.get<Product[]>("../assets/data.json");
  }

  public getProductAvailableQuantity(): number[]{
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

}
