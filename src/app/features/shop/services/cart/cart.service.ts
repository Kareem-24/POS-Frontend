import { Injectable } from '@angular/core';
import { IProduct } from '../../../lookups/models/IProduct';
import { BehaviorSubject } from 'rxjs';



export interface ICartItem extends IProduct {}

@Injectable({
  providedIn: 'root'
})

export class CartService {
private cartItems  = new BehaviorSubject<ICartItem[]>([]);
cartItems$ = this.cartItems.asObservable();


addToCart(product: IProduct){
  const currentItems = this.cartItems.getValue();
  const existingItem = currentItems.find(item => item.ID === product.ID)

  if (existingItem && existingItem.Quantity){
    existingItem.Quantity+=1;
    this.cartItems.next([...currentItems])    
  }else {
    this.cartItems.next([...currentItems, { ...product, Quantity: 1 }]);
  }
 }

 removeFromCart(productId: number) {
  const currentItems = this.cartItems.getValue();
  this.cartItems.next(currentItems.filter(item => item.ID !== productId));
}

updateQuantity(productId: number, quantity: number) {
  const currentItems = this.cartItems.getValue();
  const updatedItems = currentItems.map(item => 
    item.ID === productId ? { ...item, quantity } : item
  );
  this.cartItems.next(updatedItems);
}

getTotal(): number {
  return this.cartItems.getValue().reduce((total, item) => 
    total + (item.SellingPrice || 0) * (item.Quantity || 0), 0);
}
}
