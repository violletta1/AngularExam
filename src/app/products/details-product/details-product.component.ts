import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/types/products';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {
  @Input() selectedId: string = '';
  @Output() closeProductDetails = new EventEmitter<void>();
  currentProduct: Product | null = null;
  constructor( private productService: ProductsService){

  }
  ngOnInit(): void {
    if (this.selectedId) {
      this.productService.getProductByUid(this.selectedId).subscribe(
        (product: Product | null) => {
    
          this.currentProduct = product;
        },
        (error: any) => {
          console.error('Error fetching product details:', error);
        }
      );
    }
  }
  closeViewProductDetails(): void {
    this.closeProductDetails.emit(); 

  }
}
