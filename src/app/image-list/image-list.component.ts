import { Component, OnInit } from '@angular/core';
import { ImageService } from "../services/image.service";
import { iResult } from "../utils";

interface iImage {
  id: number,
  name: string,
  path: string
}

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.less']
})
export class ImageListComponent implements OnInit {

  imageList: iImage[] = [];

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.imageService.getImageList().subscribe((res: iResult) => {
      if(res.status) {
        this.imageList = res.data.sort((a: any, b: any) => b.id - a.id);;
      }
    });
  }

}
