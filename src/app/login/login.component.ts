import { UserService } from './../user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  err: any;
  constructor(private UserService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,[Validators.required,Validators.minLength(6)])
    })
  }
  login(form: FormGroup) {
    this.UserService.login(form).subscribe((res: any) => {
      let token = res.token
      let userId = res.userId
      localStorage.setItem('token', token)
      localStorage.setItem('userId', userId)
      this.UserService.isAuth.next(true)
      this.router.navigate(['/'])

    }, err => { this.err = err
    console.log(this.err) })

  }
}
