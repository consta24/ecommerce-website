import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './components/user/product-list/product-list.component';
import { CartComponent } from './components/user/cart/cart.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { ProductDetailsComponent } from './components/user/product-details/product-details.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { AdminProductListComponent } from './components/admin/admin-product-list/admin-product-list.component';
import { InventoryComponent } from './components/admin/inventory/inventory.component';
import { UsersComponent } from './components/admin/users/users.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { ModifyProductComponent } from './components/admin/modify-product/modify-product.component';
import { OrderSuccessComponent } from './components/user/order-success/order-success.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    UserRegisterComponent,
    UserLoginComponent,
    ProductListComponent,
    CartComponent,
    AddProductComponent,
    ProductDetailsComponent,
    AdminPanelComponent,
    AdminProductListComponent,
    InventoryComponent,
    UsersComponent,
    AdminOrdersComponent,
    ModifyProductComponent,
    OrderSuccessComponent,
    UserProfileComponent,
    HomeComponent,
    FooterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
