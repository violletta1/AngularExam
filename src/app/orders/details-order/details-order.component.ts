import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { Product } from 'src/app/types/products';
import { UsersService } from 'src/app/users/users.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-details-order',
  templateUrl: './details-order.component.html',
  styleUrls: ['./details-order.component.css']
})
export class DetailsOrderComponent implements OnInit {
  private api  = environment.firebase.databaseURL
  userOrders: Product[] = [];
  loading = false;
  viewProductClicked = false;
  userId:string|null = ''
  color = 'rgba(255, 192, 203, 0.5)';
  selectedId: string = '';
  centered = false;

  constructor(private hotToast:HotToastService,private http:HttpClient,private ordersService: OrdersService, private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.currentUser$.subscribe(user => {
      if (user?.uid) {
       this.loadUserOrders(user.uid)
      }
    });
  }

  loadUserOrders(uid: string) {
    this.ordersService.getUserOrders(uid).subscribe(
      orders => {
        this.userOrders = [];

        orders.forEach(order => {
          const products = Object.values(order) as Product[];
          this.userOrders.push(...products);
        });
      },
      error => {
        console.error('Error fetching user orders:', error);
      }
    );
  }
  
  viewProduct(product: Product): void {
    this.viewProductClicked = true;
    this.selectedId = product.uid;
  }

  closeViewProductDetails(): void {
    this.viewProductClicked = false;
    this.selectedId = '';
  }

  confirmDelete(order: Product): void {
    this.userService.getCurrentUserData.subscribe(
      user => {
        if (user && user.uid) {
          const url = `${this.api}/${user.uid}/orders/${order.uid}.json`;
          console.log(url);
          this.http.delete(url).subscribe(
            () => {
              this.hotToast.success('Product deleted from basket successfully');
            },
            error => {
              this.hotToast.error('Error deleting order:', error);
            }
          );
        } else {
          this.hotToast.error('User not authenticated or UID not available');
        }
      },
      error => {
        this.hotToast.error('Error getting current user data:', error);
      }
    );
  }

}
