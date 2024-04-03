import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Product } from 'src/app/types/products';
import { ProductsService } from '../products.service';
import { UsersService } from 'src/app/users/users.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  user$ = this.user.getCurrentUserData
  products: Product[] = [];
  loading = true;
  selectedProduct: Product | null = null;
  color = 'rgba(255, 192, 203, 0.5)';
  centered = false;
  viewProductClicked = false
  editProductClicked = false

  selectedId: string = '';

  
  constructor( private hotToast: HotToastService,private productService: ProductsService,private user:UsersService,private router: Router) {}

  ngOnInit(): void {
    this.productService.getUserProducts().subscribe({
      next: (products: Product[] | null) => {
        this.loading = false;
        if (products !== null) {
          this.products = products;

        }
      },
      error: (err: any) => {
        this.loading = false;
        this.hotToast.error(`Error fetching products: ${err.message}`);
      }
    });
  }

  viewProduct(product: Product): void {
    this.viewProductClicked = true
    this.selectedId = product.uid ;
  }
  closeViewProductDetails(): void {
    this.viewProductClicked = false;
    this.selectedId = '';
  }

  confirmDelete(product: Product): void {
    const confirmation = confirm(`Are you sure you want to delete ${product.name}?`);
    if (confirmation) {
      this.deleteProduct(product);
    }
  }

  deleteProduct(product: Product): void {
    this.productService.deleteProduct(product.uid).subscribe({
      next: () => {
        this.hotToast.success('Product deleted successfully');
        this.ngOnInit();
      },
      error: (err) => {
        this.hotToast.error(`Failed to delete product: ${err.message}`);
        console.error('Error deleting product:', err);

      }
    });
  }

}
