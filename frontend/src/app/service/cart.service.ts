import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../model/Product';
import { Observable } from 'rxjs';
import { AddToCartRequest, CartResponse } from '../model/Cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseURL: string = 'http://localhost:8080/api/cart';

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  retrieveCart(): Observable<CartResponse> {
    const headers = this.authService.getHeaders();
    const username = this.authService.getUser();
    if (!username || !headers) {
      console.error('Could not retrieve cart ', username, headers);
    }
    return this.httpClient.get<CartResponse>(`${this.baseURL}/${username}`, {
      headers,
    });
  }

  addToCart(product: Product): Observable<CartResponse> {
    const headers = this.authService.getHeaders();
    const username = this.authService.getUser()!;
    if (!username || !headers) {
      console.error('Could not add to cart', username, headers);
    }
    const addToCartRequest: AddToCartRequest = {
      username,
      product,
    };
    return this.httpClient.post<CartResponse>(
      `${this.baseURL}`,
      addToCartRequest,
      {
        headers,
      }
    );
  }

  removeFromCart(skuCode: string): Observable<CartResponse> {
    const headers = this.authService.getHeaders();
    const username = this.authService.getUser()!;
    if (!username || !headers) {
      console.error('Could not add to cart', username, headers);
    }
    return this.httpClient.post<CartResponse>(
      `${this.baseURL}/remove/${username}/${skuCode}`,
      {},
      {
        headers,
      }
    );
  }
}
