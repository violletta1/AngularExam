import { Injectable } from '@angular/core';
import { DocumentData, DocumentReference, DocumentSnapshot, Firestore,  addDoc, collection,  deleteDoc,  doc,  getDoc,  getDocs, setDoc, updateDoc, } from '@angular/fire/firestore';
import { catchError, combineLatest, concat, concatMap, from, map, Observable, of, switchMap, throwError } from 'rxjs';
import { Product } from '../types/products';
import { UsersService } from '../users/users.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { OrdersService } from '../orders/orders.service';
import { LoginComponent } from '../users/login/login.component';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private api  = environment.firebase.databaseURL
  allProducts:Product[] = []
  ordersUrl = environment.firebase.databaseURL
  constructor(private orders:OrdersService, private firestore: Firestore, private userService: UsersService,private http:HttpClient) {}

  getProductByUid(uid: string): Observable<Product | null> {
    const productDocRef = doc(this.firestore, `products/${uid}`);
    return from(getDoc(productDocRef))
    .pipe(
      map(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.data() as Product;
          data.uid = snapshot.id;
          return data;
        } else {
          return null; // Return null if product does not exist
        }
      })
    );
  }

  getUserProducts(): Observable<Product[] | null> {
    return this.userService.currentUser$.pipe(
      map(user => user?.uid), // Extract user UID
      switchMap(uid => {
        if (!uid) {
          return of([]); // Return empty array if user is not logged in
        }
        const productsCollectionRef = collection(this.firestore, `products`);
        return from(getDocs(productsCollectionRef)).pipe(
          map(snapshot => {
            return snapshot.docs.map(doc => {
              const data = doc.data() as Product;
              if (data.userId === uid) { // Check if product's userId matches user's UID
                data.uid = doc.id;
                return { ...data }; // Include document ID in each product object
              }
               else {
                return undefined; // Return undefined for products that don't match user's UID
              }
            }).filter(product => product !== undefined) as Product[]; // Remove undefined products
          })
        );
      })
    );
  }

  getAllProducts(): Observable<Product[]> {
    const productsCollectionRef = collection(this.firestore, `products`);
    return from(getDocs(productsCollectionRef))
    .pipe(
      map(snapshot => {
        return snapshot.docs.map(doc => {
          const data = doc.data() as Product;
          console.log(data.uid);
          console.log(doc.id);
          
          
          // data.uid = doc.id;
          return { ...data }; // Include document ID in each product object
        });
      })
    );
  }


  addProduct(productData: Product): Observable<DocumentReference<DocumentData, DocumentData>> {
    const allProductsCollection = collection(this.firestore, 'products');
    return from(addDoc(allProductsCollection, productData));
  }
  

  deleteProduct(productUid: string): Observable<void> {
    return this.userService.getCurrentUserData.pipe(
      switchMap(user => {
        if (!user || !user.uid) {
          throw new Error('User not found');
        }
        
        const firestoreProductDocRef = doc(this.firestore, 'products', productUid);
        const deleteFirestoreProduct$ = from(deleteDoc(firestoreProductDocRef));

        const apiUrl = `${this.api}/${user.uid}/orders/${productUid}.json`;
        const deleteRealtimeProduct$ = this.http.delete(apiUrl);

        return concat(deleteFirestoreProduct$, deleteRealtimeProduct$.pipe(switchMap(() => of(void 0))));
      })
    );
  }


  updateProduct(product: Product): Observable<any> {
    const ref = doc(this.firestore, 'products', product.uid);
    
    // Update the product
    return from(updateDoc(ref, { ...product })).pipe(
      catchError(error => {
        console.error('Error updating product:', error);
        return throwError(error);
      }),
      switchMap(() => {
        // After updating the product, update orders
        return this.orders.getAllOrders(product).pipe(
          catchError(error => {
            console.error('Error updating orders:', error);
            return throwError(error);
          })
        );
      })
    );
  }
  
}



