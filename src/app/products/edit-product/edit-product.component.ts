import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/types/products';
import { ProductsService } from '../products.service';
import { HotToastService } from '@ngneat/hot-toast';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{
  open: boolean = true;
  product: Product | null = null;


  category: string[] = ["Beauty", "Skincare", "Bodycare", "Face"];
  editProductForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private hotToast: HotToastService,
    private appService:AppService, private routeA: ActivatedRoute,private router:Router

  ) {}
  ngOnInit(): void {
    this.routeA.params.pipe(
      switchMap(params => this.productService.getProductByUid(params['id']))
    ).subscribe(product => {
      if (product) {
        this.product = product;
        this.initializeForm(product);
      }
    });
  }

  initializeForm(product: Product): void {
    this.editProductForm = this.fb.group({
      name: [product.name, Validators.required],
      description: [product.description, Validators.required],
      price: [product.price, [Validators.required, Validators.min(0)]],
      category: [product.category, Validators.required],
    });
  }

  closeFormAndReturn(): void {
    this.open = false;
    this.router.navigate(['products']);
  }

  updateProduct(): void {
    if (this.editProductForm.invalid) return;
    const updatedProduct: Product = { ...this.product!, ...this.editProductForm.value };
    this.productService.updateProduct(updatedProduct)
      .pipe(
        tap(() => {
          this.open = false;
          this.router.navigate(['products']);
        }),
        catchError(error => {
          console.error('Error updating product:', error);
          return throwError(error);
        })
      ).subscribe();
  }
}