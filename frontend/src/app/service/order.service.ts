import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Product } from '../model/Product';
import { Router } from '@angular/router';
import { CartItem } from '../model/Cart';
import { Order } from '../model/Order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseURL = 'http://localhost:8080/api/order';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  placeOrder(orderedProducts: CartItem[]): Observable<Order> {
    const headers = this.authService.getHeaders();
    if (!headers) {
      console.error('Could not get authentication headers');
    }

    return this.httpClient.post<Order>(
      `${this.baseURL}`,
      {
        username: this.authService.getUser()!,
        orderedProducts,
      },
      { headers }
    );
  }

  getAllOrders(): Observable<Order[]> {
    const headers = this.authService.getHeaders();
    if (!headers) {
      console.error('Could not get authentication headers');
    }

    return this.httpClient.get<Order[]>(`${this.baseURL}/all`, { headers });
  }

  getOrders(): Observable<Order[]> {
    const headers = this.authService.getHeaders();
    if (!headers) {
      console.error('Could not get authentication headers');
    }
    const username = this.authService.getUser()!;

    return this.httpClient.get<Order[]>(`${this.baseURL}/all/${username}`, {
      headers,
    });
  }

  getOrder(id: string): Observable<Order> {
    const headers = this.authService.getHeaders();
    if (!headers) {
      console.error('Could not get authentication headers');
    }
    const username = this.authService.getUser()!;
    return this.httpClient.get<Order>(`${this.baseURL}/${id}`, { headers });
  }
}
