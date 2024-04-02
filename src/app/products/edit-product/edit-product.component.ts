import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/types/products';
import { ProductsService } from '../products.service';
import { HotToastService } from '@ngneat/hot-toast';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{
  close: boolean = false;
  @Input() product: Product | null = null;
  @Output() cancelEdit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() submitEdit = new EventEmitter<Product>();

  category: string[] = ["Beauty", "Skincare", "Bodycare", "Face"];
  editProductForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private hotToast: HotToastService,
    private appService:AppService

  ) {}
  ngOnInit(): void {
    this.editProductForm = this.fb.group({
      name: [this.product?.name || '', Validators.required],
      description: [this.product?.description || '', Validators.required],
      price: [this.product?.price || '', [Validators.required, Validators.min(0)]],
      category: [this.product?.category || [], Validators.required],
      // img: [this.product?.img, Validators.required],
      userId: [''] // Assuming userId is a ProfileUser object
    });
  }

  // Function to handle cancel action
  OnCloseForm(): void {
    // Emit cancel event to the parent component
    this.cancelEdit.emit(false);
  }
  // onFileSelected(event: any): void {
  //   const file: File = event.target.files[0];
  //   this.editProductForm.patchValue({ img: file });
  // }
  editProduct(): void {
    const updatedProduct: Product = {
      ...(this.product as Product),
      ...this.editProductForm.value
    };
    this.submitEdit.emit(updatedProduct);
  }

}
