import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { Product } from 'src/app/types/products';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-details-order',
  templateUrl: './details-order.component.html',
  styleUrls: ['./details-order.component.css']
})
export class DetailsOrderComponent implements OnInit {
  userOrders: Product[] = [];
  loading = false;
  viewProductClicked = false;

  color = 'rgba(255, 192, 203, 0.5)';
  selectedId: string = '';
  centered = false;

  constructor(private ordersService: OrdersService, private userService: UsersService) {}

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
        console.log(orders);
        // Clear existing userOrders array
        this.userOrders = [];
        // Iterate over each order in the response
        orders.forEach(order => {
          console.log(order);
          // Extract the order details object from the value (the first and only property in the order object)
          const orderDetails = Object.values(order)[0] as Product;
          // Push the order details object into userOrders array
          this.userOrders.push(orderDetails);
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
    console.log(this.selectedId);
    console.log(product);
    
  }

  closeViewProductDetails(): void {
    this.viewProductClicked = false;
    this.selectedId = '';
  }


}
