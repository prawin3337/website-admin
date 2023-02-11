import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { iResult, iProduct } from "../utils";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public productList: iProduct[] = [];

  constructor(private http: HttpClient) { }

    addProduct(data: any): Observable<any> {
        return this.http.post<iResult>(environment.apiPaths.product, data);
    }

    getAllProducts(callback: Function) {
      this.http.get<iResult>(environment.apiPaths.product)
          .subscribe((res) => {
            if(res.status) {
              this.productList = res.data.sort((a: any, b: any) => b.productId - a.productId);
              this.productList.forEach((product) => {product.date = new Date(product.date)});
            }
            callback(this.productList);
          });
    }

    deleteProduct(productId: number) {
      const options = {
        headers: {},
        body: {productId}
      }
      return this.http.delete<iResult>(environment.apiPaths.product, options);
    }

    updateProduct(data: any): Observable<any> {
      return this.http.put<iResult>(environment.apiPaths.product, data);
  }
}
