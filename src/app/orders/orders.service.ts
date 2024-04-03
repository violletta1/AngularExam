import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, forkJoin, map, Observable, of, switchMap, throwError} from 'rxjs';
import { Product } from '../types/products';

import { UsersService } from '../users/users.service';
import { Firestore} from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HotToastService } from '@ngneat/hot-toast';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private api  = environment.firebase.databaseURL
  private productsAPI = this.api + '/orders';
  private productToAdd = new BehaviorSubject<Product | null>(null);
  productToAdd$ = this.productToAdd.asObservable();


  constructor(private firestore: Firestore, private userService: UsersService,private http:HttpClient,private hotToast:HotToastService) {}

  getUserOrders(userUid: string): Observable<any[]> {
    const orderUrl = `${this.api}/${userUid}/orders.json`;
    return this.http.get<{ [key: string]: any }>(orderUrl).pipe(
      map(response => {
        return Object.values(response)
      })
    );
  }

  addProductToOrder(product: Product, userUid: string): Observable<any> {
    const orderUrl = `${this.api}/${userUid}/orders.json`;
    return this.http.get<{ [key: string]: any }>(orderUrl).pipe(
      switchMap(response => {
        if (response && response[product.uid]) {
          this.hotToast.error('Order already exists');
          // Return an observable that emits null to complete the chain
          return of(null);
        } 
        else {
          const newOrderUrl = `${this.api}/${userUid}/orders/${product.uid}.json`;
          return this.http.post(newOrderUrl, product);
          
        }
      })
    );
  }



//todo
getAllOrders(product: Product): Observable<any[]> {
  console.log(this.api);
  
  return this.http.get<{ [key: string]: any}>(`${this.api}/.json`).pipe(
    switchMap(userId => {
      console.log(userId);
      
      const userRequests: Observable<any>[] = Object.keys(userId).map(userCode => {
        const apiUrl = `${this.api}/${userCode}/orders.json`;
        return this.http.get<{[key:string]:any}>(apiUrl).pipe(
          map(response => {
            if(response && response[product.uid]) {
              
              console.log(`User ${userCode} has an order for ${product.uid}`);
              console.log(`Response getAllOrders:`, response[product.uid]);
              
              // Replace the order with the provided product in the collection
              Object.keys(response[product.uid]).forEach(key => {
                const orderUrl = `${this.api}/${userCode}/orders/${product.uid}/${key}.json`; // Construct order URL
                this.http.put(orderUrl, product).subscribe(
                  () => console.log(`Order ${key} for user ${userCode} updated successfully`),
                  error => console.error(`Failed to update order ${key} for user ${userCode}:`, error)
                );
              });
          
              return [];
            } else {
              console.log(`User ${userCode} does not have an order for ${product.uid}`);
              return [];
            }
          })
        );
      });
      
      return forkJoin(userRequests).pipe(
        map(results => results.flat())
      ); // Combining all user requests into one observable
    })
  );
}

deleteProductFromOrder(product: Product): Observable<any> {
  return this.http.get<{ [key: string]: any }>(`${this.api}/.json`).pipe(
    switchMap(userId => {
      const deleteUserRequests: Observable<void>[] = [];

      Object.keys(userId).forEach(userCode => {
        const apiUrl = `${this.api}/${userCode}/orders/${product.uid}.json`;

  
          this.http.delete(apiUrl)
          
        
      });

      return forkJoin(deleteUserRequests);
    })
  );
}
}

