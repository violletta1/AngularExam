import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NotFoundComponent } from './not-found/not-found.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { provideStorage,getStorage} from '@angular/fire/storage';
import {provideAuth,getAuth} from '@angular/fire/auth';
import {provideFirestore,getFirestore} from '@angular/fire/firestore';
import { HotToastModule } from '@ngneat/hot-toast'
import {MatButtonModule} from '@angular/material/button';
import { OrdersModule } from './orders/orders.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,
    CoreModule,OrdersModule,
    BrowserAnimationsModule,MatButtonModule,
    provideFirebaseApp(()=> initializeApp(environment.firebase)),
    provideAuth(()=> getAuth()), 
    provideStorage(()=> getStorage()),
    HotToastModule.forRoot(),
    provideFirestore(()=> getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
