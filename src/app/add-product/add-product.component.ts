import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { iProduct } from '../utils';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.less']
})
export class AddProductComponent implements OnInit {

  product: iProduct = null;

  categories: any = [
    // {id: 1, name: "solar"},
    // {id: 4, name: "communication devices"},
    // {id: 6, name: "analog converter"},
    // {id: 7, name: "serial converter"}
  ]

  pages: any = [
    {id: "home", name: "home"},
    {id: "product", name: "product"}
  ]

  productForm: FormGroup = this.fb.group({});

  formMessage = {
    productId: "",
    name: "",
    descriptions: "",
    details: "",
    pages: "",
    metaKeywords: "",
    categoryId: "",
    features: "",
    price: "",
    images: ""
  }

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getCategories();
    this.buildProductForm();

    this.route.queryParams.subscribe((params) => {
      this.productService.getAllProducts(() => {
        if(params.productId != null) {
          this.product = this.productService.productList.find(({productId}) => productId == params.productId);
          this.product && this.setProductData(this.product);
        }
      });
    });
  }

  buildProductForm(): void {
    this.productForm = this.fb.group({
        productId: [""],
        name: ["", [Validators.required]],
        descriptions: ["", [Validators.required]],
        pages: ["home", [Validators.required]],
        metaKeywords: ["", [Validators.required]],
        details: ["", [Validators.required]],
        categoryId: ["", [Validators.required]],
        price: [-1, [Validators.required]],
        features: this.fb.array([this.getFeatures()]),
        images: this.fb.array([this.getImages()])
    });
  }

  setProductData(data: iProduct) {
    // Used while update
    if(data.images.length && this.productImagesGroup['controls'].length < data.images.length) {
      const newDataLength = data.images.length - this.productImagesGroup['controls'].length;
      for(let i = 0; i < newDataLength; i++) {
        this.addImages();
      }
    }

    if(data.features.length && this.productFeaturesGroup['controls'].length < data.features.length) {
      const newDataLength = data.features.length - this.productFeaturesGroup['controls'].length;
      for(let i = 0; i < newDataLength; i++) {
        this.addFeatures();
      }
    }

    this.productForm.setValue({
      productId: data.productId,
      name: data.productName,
      descriptions: data.productDesc,
      pages: data.pages,
      metaKeywords: data.metaKeywords,
      details: data.productDetails,
      categoryId: data.categoryId,
      price: data.price,
      features: data.features,
      images: data.images
    });
  }

  getCategories() {
    this.categoryService.getCategoryList()
        .subscribe((result) => {
          this.categories = result.data;
        });
  }

  getFeatures() {
    return this.fb.group({
      details: ["", [Validators.required]]
    })
  }

  addFeatures() {
    (<FormArray>this.productForm.get('features')).push(this.getFeatures());
  }

  removeFeatures(index: number) {
    (<FormArray>this.productForm.get('features')).removeAt(index);
  }

  getImages() {
    return this.fb.group({
      id: ["", [Validators.required]],
      name: ["", [Validators.required]],
      type: [""]
    })
  }

  get productFeaturesGroup (): FormArray {
    return (<FormArray>this.productForm.get('features'))
  }

  get productImagesGroup ():  FormArray {
    return (<FormArray>this.productForm.get('images'))
  }

  removeImages(index: number) {
    (<FormArray>this.productForm.get('images')).removeAt(index);
  }

  addImages() {
    (<FormArray>this.productForm.get('images')).push(this.getImages());
  }

  logValidationErrors() {

  }

  addProduct() {
    if(this.isUpdate()) {
      this.productService.updateProduct(this.productForm.value).subscribe((result) => {
        alert("Product Updated.");
        this.router.navigate(["/add-product"], {queryParams: {productId: result.data.insertId}})
      });
    } else {
      this.productService.addProduct(this.productForm.value).subscribe((result) => {
        this.productForm.reset();
        alert("Product submited.");
      });
    }
  }

  isUpdate() {
    return this.product && this.product.productId;
  }

}
