import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UsersService } from '../users.service';
import { HotToastService } from '@ngneat/hot-toast';
import {Router } from '@angular/router';
import { switchMap } from 'rxjs';


export function passwordMatchValidator():ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if(password && confirmPassword && password !== confirmPassword){
      return {
        passwordDontMatch: true
      }
    }return null;
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  registerForm =new FormGroup({
    displayName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required])
  },{validators: passwordMatchValidator()})

  constructor( private userService: UsersService,private hotToast:HotToastService,private router:Router) { }

  ngOnInit(): void {

  }
  get displayName(){
    return this.registerForm.get('displayName')
  }
  get email(){
    return this.registerForm.get('email')
  }
  get password(){
    return this.registerForm.get('password')
  }
  get confirmPassword(){
    return this.registerForm.get('confirmPassword')
  }


  onFormSignUp(): void {
    if(!this.registerForm.valid) return

    const { displayName, email, password } = this.registerForm.value;
    
    if (email && displayName && password) {
      this.userService.register(email, password).pipe(
  
        switchMap(({user: {uid}})=> {
          return this.userService.addUser({ uid, email, displayName:displayName });
        }),
        this.hotToast.observe({
          success: 'Congrats!You are all signed up',
          loading: 'Signing in ...',
          error: ({message}) => `${message}`
        })
      ).subscribe(()=>{
        this.router.navigate(['/home'])
      })
    }
  }
  
}