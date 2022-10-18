import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/posts.service';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent implements OnInit {
  content!: string
  title!: string;
  postImg!: any
  imgPreview!: any
  showSpinner=false;
  constructor(private postsService: PostsService, private ActivatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.ActivatedRoute.paramMap.subscribe((paramMap) => {
      if (paramMap.has('postId')) {
        const postId = paramMap.get('postId');
        this.postsService.getPost(postId).subscribe((post) => {
          this.title = post.title;
          this.content = post.content;
          this.imgPreview = post.imgPath
        });
      }
    });
  }
  onCreatepost(Form: NgForm) {
    if(!this.postImg && !this.imgPreview) {
      console.log(!this.imgPreview)
      console.log(this.postImg)
      alert('Please upload an image')

    }
    else  {
      this.ActivatedRoute.paramMap.subscribe((paramMap) => {
        if (paramMap.has('postId')) {
          const postId = paramMap.get('postId');
          const post = { title: Form.value.title, content: Form.value.content, postImg: this.postImg ? this.postImg : this.imgPreview };
          this.postsService.editPost(postId, post);
          this.postsService.cloudnairyFinished.subscribe((res) => {
            this.showSpinner = res
            if (res === false) {
              this.router.navigate(['/posts'])
            }
          })

        } else {

          const post = { title: Form.value.title, content: Form.value.content, postImg: this.postImg };
          console.log(post)
          this.postsService.postPost(post);
          Form.resetForm();
          this.postsService.cloudnairyFinished.subscribe((res) => {
            this.showSpinner = res
            if (res === false) {
              this.router.navigate(['/posts'])
            }
          })
        }

      });
    }


  }
  onImagePic(event: Event) {
    this.postImg = (event.target as HTMLInputElement).files![0]
    if (this.postImg.type === 'image/jpeg' || this.postImg.type === 'image/png') {
      const reader = new FileReader();
      reader.readAsDataURL(this.postImg)
      reader.onload = (evt: any) => {
        this.imgPreview = reader.result
      }
    }
    else {
      this.postImg = null
      alert('Please upload a valid image')
    }
  }
  ngOnDestroy() {
    this.postsService.cloudnairyFinished.next(true)

  }
}
