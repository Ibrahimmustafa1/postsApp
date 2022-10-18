import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(private userService: UserService) { }
  err: any;
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    })
  }
  register(form: FormGroup) {
    this.userService.register(form).subscribe((res: any) => {

    }, err => { this.err = err
    console.log(err) })

  }
}
