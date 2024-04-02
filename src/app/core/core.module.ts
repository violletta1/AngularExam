import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadersComponent } from './headers/headers.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    HeadersComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,RouterModule,MatMenuModule,MatIconModule
  ],exports:[
    HeadersComponent,
    FooterComponent
  ]
})
export class CoreModule {
  
 }
