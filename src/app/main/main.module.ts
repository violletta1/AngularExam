import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { MainRoutingModule } from './main-rounting.module';
import { HomeComponent } from './home/home.component';
import { ProductsModule } from '../products/products.module';

import {MatCardModule} from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,MainRoutingModule,RouterModule,ProductsModule,
    
    MatCardModule,MatRippleModule,MatButtonModule,MatFormFieldModule,
    MatIconModule,MatSelectModule,ProductsModule,MatChipsModule
  ],exports:[
    DashboardComponent,HomeComponent
  ]
})
export class MainModule { }
