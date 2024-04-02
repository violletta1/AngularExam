import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { canActivate } from '../RouteGuards/authGuard';
import {canActivate,redirectUnauthorizedTo} from '@angular/fire/auth-guard'
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { DetailsProductComponent } from './details-product/details-product.component';

const redirectToLogin = ()=> redirectUnauthorizedTo(['/auth/login'])


const routes: Routes = [

    { path: 'add-product', component: AddProductComponent, ...canActivate(redirectToLogin) },
    { path: '', component: ViewProductComponent, ...canActivate(redirectToLogin) },
    { path: ':id/edit', component: EditProductComponent, ...canActivate(redirectToLogin) },
    // {path: 'details-product/:id', component:DetailsProductComponent, ...canActivate(redirectToLogin)}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}