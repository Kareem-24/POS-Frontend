import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICartItem } from '../../../../services/cart/cart.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  @Input() item!:  ICartItem;
  @Output() quantityChange = new EventEmitter<number>();
  @Output() remove = new EventEmitter<void>();

  updateQuantity(quantity: number) {
    if (quantity >= 1) {
      this.quantityChange.emit(quantity);
    }
  }
}
