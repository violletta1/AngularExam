import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup,  Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // errorMessage: string|null = null;

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required]),
  })

  constructor(
    private userService:UsersService,
    private route:Router,
    private hotService:HotToastService
    ) {}
    ngOnInit():void{
      
    }
  get email(){
    return this.loginForm.get('email')
  }
  get password(){
    return this.loginForm.get('password')
  }

  submitLogin(){
    if(!this.loginForm.valid){
      return;
    }
    const {email,password} = this.loginForm.value
    this.userService.login(email! , password!).pipe(
      this.hotService.observe({
        success: 'Login successful',
        loading: 'Logging in ...',
        error: 'There was an error'
      })
    ).subscribe(()=>{
      this.route.navigate(['/auth/profile']);
    })
  }
}