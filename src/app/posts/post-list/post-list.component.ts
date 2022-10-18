import { UserService } from './../../user.service';
import { Component, Input, OnInit } from '@angular/core';
import { PostsService } from 'src/app/posts.service';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  constructor(private postsService: PostsService, private UserService: UserService) { }
  panelOpenState = false;
  userId = localStorage.getItem('userId')
  posts!: any
  totalPosts!: number
  postsPerPage!: number
  currentPage: number = 1
  isAuth: Boolean = false;
  ngOnInit(): void {
    this.postsPerPage = JSON.parse(localStorage.getItem('postsPerPage')!)
    if (!this.postsPerPage) this.postsPerPage = 2
    localStorage.setItem('postsPerPage', JSON.stringify(this.postsPerPage))
    this.postsService.getPosts(this.postsPerPage)
    this.postsService.posts.subscribe(data => {
      this.posts = data.posts;
      this.totalPosts = data.totalPosts;
    })
    this.UserService.isAuth.subscribe((res) => {
      this.isAuth = res
    })
  }
  deletePost(post: any) {
    this.postsService.deletePost(post._id).subscribe(data => {
      this.postsService.getPosts(this.postsPerPage)
    })


  }
  onPageChange(pageData: PageEvent) {
    this.postsPerPage = pageData.pageSize
    this.currentPage = pageData.pageIndex + 1
    this.postsService.getPosts(pageData.pageSize, this.currentPage)
    localStorage.setItem('postsPerPage', JSON.stringify(this.postsPerPage))
  }

}
