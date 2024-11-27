import { Routes } from '@angular/router';
import { AllUsersComponent } from './features/user/components/all-users/all-users.component';
import { CategoriesComponent } from './features/lookups/components/categories/categories.component';
import { ProductsComponent } from './features/lookups/components/products/products.component';
import { BordComponent } from './features/shop/components/sell-bord/bord/bord.component';
import { CartComponent } from './features/shop/components/shoping-cart/cart/cart/cart.component';

export const routes: Routes = [
    { path: 'all-users', component: AllUsersComponent },
    { path: 'lookups/categories', component: CategoriesComponent },
    { path: 'lookups/products', component: ProductsComponent },
    { path: 'sell-bord', component: BordComponent },
    { path: 'cart', component: CartComponent }

  ];

