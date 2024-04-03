import { Component,  OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { OrdersService } from 'src/app/orders/orders.service';

import { ProductsService } from 'src/app/products/products.service';
import { Product } from 'src/app/types/products';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user$ = this.userService.getCurrentUserData;
  // openCreateProductForm: boolean = false;

  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string | null = null;

  viewProductClicked = false;
  selectedId: string = '';
  color = 'rgba(255, 192, 203, 0.5)';

  centered = false;
  loading = false;
  categories: string[] = ["Beauty", "Skincare", "Bodycare", "Face", "All"];

  constructor(private hotToast: HotToastService, public userService: UsersService, private productsService: ProductsService,private orderService: OrdersService) {}

  ngOnInit(): void {
    if (this.user$) {
      this.loading = true;
      this.productsService.getAllProducts().subscribe(
        (products) => {
          this.products = products;
          this.filteredProducts = products; // Initialize filteredProducts with all products
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.hotToast.error(`Error fetching products: ${error.message}`);
        }
      );
    }
  }

  filterProductsByCategory(category: string): void {

    this.selectedCategory = category; // Set the selected category
  
    if (category === 'All') {
      // If 'All' category is selected, show all products
      this.filteredProducts = this.products;
    } else {
      // Filter products based on the selected category (case-insensitive)
      this.filteredProducts = this.products.filter(product =>
        product.category.some(cat => cat.toLowerCase() === category.toLowerCase())
      );
    }
  }

  viewProduct(product: Product): void {
    this.viewProductClicked = true;
    this.selectedId = product.uid;
  }

  closeViewProductDetails(): void {
    this.viewProductClicked = false;
    this.selectedId = '';
  }
  
  orderProduct(event: MouseEvent, product: Product) {
    event.stopPropagation();
    this.userService.getCurrentUserUid().subscribe(
      userId => {
        if (userId) {
          this.orderService.addProductToOrder(product, userId).subscribe(
            response => {
              if (response !== null) {
                this.hotToast.success('Product added successfully to order collection');
              }},
            error => {
              this.hotToast.error(`There was an error ${error}`)
            }
          );
        }
      }
    );
  }
  }
