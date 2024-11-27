import { CartService } from './../../../services/cart/cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../../../lookups/models/IProduct';
import { ProductService } from '../../../../lookups/services/product/product.service';
import { CardItemComponent } from '../card-item/card-item.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-bord',
  standalone: true,
  imports: [CardItemComponent,MatProgressSpinnerModule,CommonModule],
  templateUrl: './bord.component.html',
  styleUrl: './bord.component.css'
})
export class BordComponent implements OnInit {
  products: IProduct[] = [];
  isLoading = true;
  @Input() product?: IProduct;

constructor(
    private productService: ProductService,
   private CartService : CartService
  ){}
  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(){
    const product:IProduct = {};
    this.isLoading = true;
    this.productService.getAllProducts(product).subscribe(
      response => {
        this.products = response.Data;
        this.isLoading = false;
          }
    );
  }

  onAddToCart(product: IProduct): void {
    this.CartService.addToCart(product);
    console.log(product)
  }}

