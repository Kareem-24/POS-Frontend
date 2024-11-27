import { Component} from '@angular/core';
import { CartService, ICartItem } from '../../../../services/cart/cart.service';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent,MatCardModule,CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartItems$;
  total$;

  constructor(public cartService: CartService) {
    this.cartItems$ = this.cartService.cartItems$; 
    this.total$ = this.cartService.getTotal(); 
  }


  updateQuantity(quantity: number, item: ICartItem) {
    this.cartService.updateQuantity(item.ID!, quantity);
  }

  removeItem(item: ICartItem) {
    this.cartService.removeFromCart(item.ID!);
  }

  checkout() {
    // Implement checkout logic
    console.log('Proceeding to checkout');
  }
}
