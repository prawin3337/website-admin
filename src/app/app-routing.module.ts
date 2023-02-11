import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ImagesUploadComponent } from './images-upload/images-upload.component';
import { ImageListComponent } from "./image-list/image-list.component";
import { CategoryListComponent } from "./category-list/category-list.component";

const routes: Routes = [
  {
      path: "add-product",
      component: AddProductComponent
  },
  {
    path: "product-list",
    component: ProductListComponent
  },
  {
    path: "image-upload",
    component: ImagesUploadComponent
  },
  {
    path: "image-list",
    component: ImageListComponent
  },{
    path: "category-list",
    component: CategoryListComponent
  },{
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
