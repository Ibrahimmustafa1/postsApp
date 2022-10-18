import { Postinterface } from './posts/postinterface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  posts: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) { }
  cloudnairyFinished:BehaviorSubject<any> = new BehaviorSubject<any>(true)
  getPosts(pageSize?: number, page?: number) {
    this.http.get<any>(`https://appposts-post.herokuapp.com/posts?pageSize=${pageSize}&page=${page}`).subscribe((posts) => {
      this.posts.next({
        posts: [...posts.posts],
        totalPosts: posts.totalPosts
      });
    });
  }
  postPost(post: any) {
    const postData = new FormData()
    postData.append('title', post.title)
    postData.append('content', post.content)
    postData.append('postImg', post.postImg)
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    this.http.post<any>('https://appposts-post.herokuapp.com/post', postData, { headers: headers }).subscribe((data) => {
      console.log(data)
      this.cloudnairyFinished.next(false)
    }, err => {
      console.log(err)
    });
  }
  deletePost(id: string) {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.delete<any>('https://appposts-post.herokuapp.com/post/' + id, { headers: headers })
  }
  editPost(id: any, post: any) {
    const postData = new FormData()
    postData.append('title', post.title)
    postData.append('content', post.content)
    postData.append('postImg', post.postImg)
    console.log(localStorage.getItem('token'))
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    this.http.put<Postinterface[]>('https://appposts-post.herokuapp.com/post/' + id, postData, { headers: headers }).subscribe((data) => {
      console.log(data)
      this.cloudnairyFinished.next(false)
      this.getPosts();
    });
  }
  getPost(id: any) {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<Postinterface>('https://appposts-post.herokuapp.com/posts/' + id, { headers: headers });

  }
}
