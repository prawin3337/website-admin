import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageService } from "../services/image.service";

@Component({
  selector: 'app-images-upload',
  templateUrl: './images-upload.component.html',
  styleUrls: ['./images-upload.component.less']
})
export class ImagesUploadComponent implements OnInit {

  postTitle: '';
    postAuthor: '';
    postContent: '';
    postImgUrl: string;
    post: any[] = [];
    postForm: FormGroup;
    config: any;

    constructor(private imageService: ImageService, 
      private formBuilder: FormBuilder,
    private router: Router) {}

    onFileSelect(event: Event) {
      const file = (event.target as HTMLInputElement).files[0];
      this.postForm.patchValue({ image: file });
      const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.postImgUrl = reader.result as string;
          this.postForm.patchValue({ postImgUrl: this.postImgUrl });
          console.log(this.postImgUrl);
        };
        reader.readAsDataURL(file);
      }
    }
  
    ngOnInit(): void {
  
      this.postForm = new FormGroup({
        postTitle: new FormControl(null),
        postAuthor: new FormControl(null),
        postContent: new FormControl(null),
        postImgUrl: new FormControl(null)
      });
  }
  
   onBlogSubmit() {
     console.log(this.postForm.value);
      this.imageService.uploadImmage(this.postForm.value).subscribe(
          data => {     
              //this.flashMessage.show('Blog Submitted Successfully', {cssClass: 'alert-success', timeout: 3000});
              //this.router.navigate(['/blog-page']);
          },
          error => {
              //this.flashMessage.show('Something Went Wrong', {cssClass: 'alert-danger', timeout: 3000});
          }
      );
    }
}
