import { Postinterface } from './posts/postinterface';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'postsApp';
  posts: any = [];
  onPostAdded(post: Postinterface) {

    this.posts.push(post);
  }
}
