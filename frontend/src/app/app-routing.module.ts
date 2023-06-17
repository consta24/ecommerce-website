import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthAccessGuard } from './guard/auth-access.guard';
import { ProductListComponent } from './components/user/product-list/product-list.component';
import { CartComponent } from './components/user/cart/cart.component';
import { ProductDetailsComponent } from './components/user/product-details/product-details.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { ModifyProductComponent } from './components/admin/modify-product/modify-product.component';
import { OrderSuccessComponent } from './components/user/order-success/order-success.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  ///////////AUTH
  {
    path: 'login',
    component: UserLoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: UserRegisterComponent,
    canActivate: [AuthGuard],
  },
  ///////////USER
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [AuthAccessGuard],
  },
  {
    path: 'products/:skuCode',
    component: ProductDetailsComponent,
    canActivate: [AuthAccessGuard],
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthAccessGuard],
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthAccessGuard],
  },
  {
    path: 'order/:id',
    component: OrderSuccessComponent,
    canActivate: [AuthAccessGuard],
  },
  ///////////ADMIN
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [AuthAccessGuard],
  },
  {
    path: 'admin/modify/:skuCode',
    component: ModifyProductComponent,
    canActivate: [AuthAccessGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
