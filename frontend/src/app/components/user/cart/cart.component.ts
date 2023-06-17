import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem, CartResponse } from 'src/app/model/Cart';
import { Product } from 'src/app/model/Product';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.retrieveCart().subscribe(
      (data: CartResponse) => {
        console.log(data);
        this.cartItems = data.cartItems;
        console.log(this.cartItems);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  removeFromCart(skuCode: string) {
    this.cartService.removeFromCart(skuCode).subscribe(
      (data: CartResponse) => {
        console.log(data);
        this.cartItems = [...data.cartItems];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  placeOrder() {
    this.orderService.placeOrder(this.cartItems).subscribe(
      (data) => {
        console.log(data);
        this.goToOrderSucces(data.orderNumber);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  goToOrderSucces(id: string) {
    console.log('navigate');
    this.router.navigate(['/order', id]);
  }
}
