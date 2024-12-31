import { CartService } from './../../../services/cart/cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../../../lookups/models/IProduct';
import { ProductService } from '../../../../lookups/services/product/product.service';
import { CardItemComponent } from '../card-item/card-item.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../../../../shared/components/search-bar/search-bar/search-bar.component';
import { ISearch } from '../../../../lookups/models/ISearch';
import { NotificationService } from '../../../../../shared/services/notification/notification.service';

@Component({
  selector: 'app-bord',
  standalone: true,
  imports: [CardItemComponent,MatProgressSpinnerModule,CommonModule,SearchBarComponent],
  templateUrl: './bord.component.html',
  styleUrl: './bord.component.css'
})
export class BordComponent implements OnInit {
  products: IProduct[] = [];
  isLoading = true;
  @Input() product?: IProduct;

constructor(
    private productService: ProductService,
   private CartService : CartService,
   public notificationService: NotificationService,

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
  }


  searchProducts(searchTerm: string): void {

  let request = {} as ISearch;

  if (searchTerm) {
    this.isLoading = true;
    request.Name = searchTerm;
    this.productService.SearchProductByNameOrCode(request).subscribe({
      next: (response) => {
        this.products = response.Data as IProduct[];
        this.isLoading = false;

      },
      error: (error) => {
        this.isLoading = false;
        this.notificationService.showNotification('حدث خطاء في عملية البحث ', 'error');
      }
    });
  }
}


}

