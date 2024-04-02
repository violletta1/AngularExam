import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import {canActivate,redirectUnauthorizedTo} from '@angular/fire/auth-guard'

const redirectToLogin = ()=> redirectUnauthorizedTo(['/auth/login'])

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent , ...canActivate(redirectToLogin)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}