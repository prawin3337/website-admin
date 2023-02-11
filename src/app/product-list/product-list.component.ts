import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { iProduct } from "../utils";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
export class ProductListComponent implements OnInit {

  productList:iProduct[] = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.fetchProductList();
  }

  fetchProductList() {
    this.productService.getAllProducts((data: iProduct[]) => {
      this.productList = data;
    });
  }

  onDelete(event: Event, productId: number) {
    event.preventDefault();

    const product = this.productList.find((pro) => pro.productId == productId);
    if(confirm(`Do you want to delete product "${product.productName}"?`)) {
      this.productService.deleteProduct(productId).subscribe((res) => {
        this.fetchProductList();
      });
    }
  }

  onUpdate(event: Event, productId: number) {
    event.preventDefault();
    this.router.navigate(["/add-product"], {queryParams: {productId}})
  }

}
