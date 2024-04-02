import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { UsersService } from 'src/app/users/users.service';
import { Product } from 'src/app/types/products';
import { ProfileUser } from 'src/app/types/user-profile';
import { HotToastService } from '@ngneat/hot-toast';

import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  close: boolean = false;
  category: string[] = ["Beauty", "Skincare", "Bodycare", "Face"];
  addProductForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private hotToast: HotToastService,
    private appService:AppService,
    private router:Router

  ) {}

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: [[], Validators.required],
      img: ['',Validators.required],
      userId: [''] // Assuming userId is a ProfileUser object
    });
  }

  OnCloseForm(): void {

    this.close = true;
    this.router.navigate(['dashboard']);
    
  }

  addProduct(): void {
    if (!this.addProductForm.valid) return;

    const productData: Product = {
      uid: '',
      ...this.addProductForm.value
    };

    // Fetch the selected image file from the form control
    const imageFile = this.addProductForm.get('img')?.value;
  
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 10000);
    const uniqueId = `${timestamp}-${randomNumber}`;

    // Call the uploadImage service to upload the image
    this.appService.uploadImage(imageFile, `images/products/${uniqueId}`).subscribe({
      next: (name) => {
        productData.img = name;
        this.productService.addProduct(productData).subscribe({
          next: () => {
            this.hotToast.success('Product added successfully');
            this.OnCloseForm();
          },
          error: (err) => {
            this.hotToast.error(`Failed to add product: ${err.message}`);
          }
        });
      },
      error: (err) => {
        this.hotToast.error(`Failed to upload image: ${err.message}`);
      }
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.addProductForm.patchValue({ img: file });
  }
}
