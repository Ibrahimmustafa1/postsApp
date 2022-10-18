import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  isAuth:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {
    if(localStorage.getItem('token')){
      this.isAuth.next(true)
    }
  }

  login(userForm:FormGroup){
    return this.http.post('https://appposts-post.herokuapp.com/login',userForm.value)
  }

  register(register:FormGroup){
    return this.http.post('https://appposts-post.herokuapp.com/signup',register.value)
  }

}
