import { Component } from '@angular/core';
import { Order } from 'src/app/model/Order';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  user: User = new User(0, '', '', '', false);
  ordersPlaced: Order[] = [];

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.authService.retrieveUser(this.authService.getUser()!).subscribe(
      (data) => {
        console.log(data);
        this.user = data;
      },
      (error) => {
        console.error(error);
      }
    );
    this.orderService.getOrders().subscribe(
      (data) => {
        console.log(data);
        this.ordersPlaced = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
