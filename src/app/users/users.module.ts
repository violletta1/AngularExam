import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from './users-rounting.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,

  ],
  imports: [
    CommonModule,

    UserRoutingModule,
    RouterModule,   

    FormsModule,
    ReactiveFormsModule,   
     
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],exports:[
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ]
})
export class UsersModule { }
