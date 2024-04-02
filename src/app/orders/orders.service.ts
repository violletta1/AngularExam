import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, from, map, Observable } from 'rxjs';
import { Product } from '../types/products';

import { UsersService } from '../users/users.service';
import { DocumentData, DocumentReference,  Firestore,  addDoc, collection,  getDocs, } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private api  = environment.firebase.databaseURL
  private productsAPI = this.api + '/orders';
  private productToAdd = new BehaviorSubject<Product | null>(null);
  productToAdd$ = this.productToAdd.asObservable();


  constructor(private firestore: Firestore, private userService: UsersService,private http:HttpClient) {}

  addProductToOrder(product: Product, userUid: string): Observable<any> {
    // Construct the order URL with the product UID as the key
    const orderUrl = `${this.api}/${userUid}/orders/${product.uid}.json`; 
    return this.http.post(orderUrl, product);
  }
  
  getUserOrders(userUid: string): Observable<any[]> {
    const orderUrl = `${this.api}/${userUid}/orders.json`;
  
    return this.http.get<{ [key: string]: any }>(orderUrl).pipe(
      map(response => {
        // Map the response to transform it into the desired format
        return Object.values(response).map(value => {
          // Return each product directly
          return value;
        });
      })
    );
  }
  
}

