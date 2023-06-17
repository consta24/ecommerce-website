import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/model/Order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css'],
})
export class OrderSuccessComponent {
  order: Order = {
    orderNumber: '',
    date: '',
    username: '',
    orderItems: [],
  };

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.getOrder(this.route.snapshot.paramMap.get('id')!);
  }

  getOrder(orderNumber: string) {
    this.orderService.getOrder(orderNumber).subscribe(
      (data) => {
        console.log(data);
        this.order = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
