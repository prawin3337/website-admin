import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { iResult } from "../utils";

export interface iImage {
  type: string,
  image: File
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  uploadImmage(post: any) {
    const headers = {'Content-Type': 'multipart/form-data;boundary=test'};
    // return this.http.post(environment.apiPaths.images, data, {headers});
    //return this.http.post("http://httpbin.org/post", data);
    const formData: FormData = new FormData();
    formData.append('image', post.postImgUrl);
    return this.http.post(environment.apiPaths.images, formData, { headers: headers });
  }

  getImageList() {
    return this.http.get<iResult>(environment.apiPaths.images);
  }
}
