import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatCardSubtitle } from '@angular/material/card';
import {  MatChipsModule } from '@angular/material/chips';
import { IProduct } from '../../../../lookups/models/IProduct';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [MatCardModule, MatCardTitle, MatCardSubtitle, MatFormFieldModule, MatInputModule,CommonModule,MatIconModule,FormsModule,MatChipsModule],
templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css'
})
export class CardItemComponent {
  @Input() product?: IProduct;
  @Output() addToCartEvent = new EventEmitter<{product: IProduct, quantity: number}>();

  quantity: number = 1;

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < (this.product?.Quantity || 0) ) {
      this.quantity++;
    }
  }

  addToCart(): void {
    if (this.product) {
      this.addToCartEvent.emit({
        product: this.product,
        quantity: this.quantity
      });
    }
  }
}
