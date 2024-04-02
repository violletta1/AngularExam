import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { canActivate } from '../RouteGuards/authGuard';
import {canActivate,redirectUnauthorizedTo} from '@angular/fire/auth-guard'
import { AddOrderComponent } from './add-order/add-order.component';
import { DetailsOrderComponent } from './details-order/details-order.component';


const redirectToLogin = ()=> redirectUnauthorizedTo(['/auth/login'])


const routes: Routes = [

    { path: 'add-order', component: AddOrderComponent, ...canActivate(redirectToLogin) },
    { path: 'details-order', component: DetailsOrderComponent, ...canActivate(redirectToLogin) },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}