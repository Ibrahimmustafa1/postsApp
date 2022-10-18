import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private UserService: UserService,private router:Router) { }
  isAuth:Boolean = false;
  ngOnInit(): void {
    this.UserService.isAuth.subscribe((res) => {
      this.isAuth = res
    })
  }
  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    this.UserService.isAuth.next(false)
    this.router.navigate(['/posts'])
  }
}
