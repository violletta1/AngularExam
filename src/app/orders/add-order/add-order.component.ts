import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products/products.service';
import { Product } from 'src/app/types/products';
import { UsersService } from 'src/app/users/users.service';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent 
implements OnInit 
 {
  orders: Product[] = [];
  user$ = this.userService.getCurrentUserData;
  constructor(private productService: ProductsService,private userService:UsersService,private orderService: OrdersService) { }
  ngOnInit(): void {
    this.orderService.productToAdd$.subscribe((product) => {
      if (product !== null) {
        this.orders.push(product);
      }
    });}


}
