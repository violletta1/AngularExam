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


}
