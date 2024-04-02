import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { ProductsRoutingModule } from './products-rounting.module';
import { RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DetailsProductComponent } from './details-product/details-product.component';
import { MatSelectModule } from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    EditProductComponent,
    ViewProductComponent,
    AddProductComponent,
    DetailsProductComponent
  ],
  imports: [
    CommonModule,ProductsRoutingModule,RouterModule,
    FormsModule,
    ReactiveFormsModule,
    
    MatCardModule,MatRippleModule,MatButtonModule,MatFormFieldModule,
    MatIconModule,MatSelectModule,MatChipsModule
    
  ],exports:[
    EditProductComponent,
    ViewProductComponent,
    AddProductComponent,DetailsProductComponent
  ]
})
export class ProductsModule { }
