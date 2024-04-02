import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  {
    path:'',
    loadChildren:()=> import('./main/main.module').then((m)=>m.MainModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
  },{
    path: 'products',
    loadChildren:()=> import('./products/products.module').then((m)=> m.ProductsModule)
  },
  {
    path:'orders',
    loadChildren:()=> import('./orders/orders.module').then((m)=> m.OrdersModule)
  },
  // { path: 'error', component: ErrorsComponent },
  { path: '**', redirectTo: '/404' },
  { path: '404', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
