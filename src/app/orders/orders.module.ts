import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrderComponent } from './add-order/add-order.component';
import { RouterModule } from '@angular/router';
import { OrdersRoutingModule } from './orders-rounting.module';
import { DetailsOrderComponent } from './details-order/details-order.component';

import {MatCardModule} from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { ProductsModule } from '../products/products.module';


@NgModule({
  declarations: [
    AddOrderComponent,
    DetailsOrderComponent
  ],
  imports: [
    CommonModule,OrdersRoutingModule,RouterModule,   
    MatCardModule,MatRippleModule,MatButtonModule,MatFormFieldModule,
    MatIconModule,MatSelectModule,MatChipsModule,ProductsModule
  ],exports:[
    AddOrderComponent,DetailsOrderComponent
  ]
})
export class OrdersModule { }
