import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../services/category.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.less']
})
export class CategoryListComponent implements OnInit {

  categoryList: any[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList() {
    this.categoryService.getCategoryList()
        .subscribe((res) => {
          if(res && res.data) {
            this.categoryList = res.data;
          }
        });
  }

}
