import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
// import { canActivate } from '../RouteGuards/authGuard';
import {canActivate,redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/auth-guard'

const redirectToLogin = ()=> redirectUnauthorizedTo(['/auth/login'])
const redirectToHome= () => redirectLoggedInTo(['/home'])

const routes: Routes = [
  { path: 'login', component: LoginComponent , ...canActivate(redirectToHome)},
  { path: 'register', component: RegisterComponent , ...canActivate(redirectToHome)},
  { path: 'profile', component: ProfileComponent , ...canActivate(redirectToLogin) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}