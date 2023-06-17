import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../model/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseURL = 'http://localhost:8080/api/product';

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  getProduct(skuCode: string): Observable<Product> {
    const headers = this.authService.getHeaders();
    if (!headers) {
      console.error('Could not get authentication headers');
    }
    return this.httpClient.get<Product>(`${this.baseURL}/${skuCode}`, {
      headers,
    });
  }

  modifyProduct(skuCode: string, product: Product): Observable<Product> {
    const headers = this.authService.getHeaders();
    if (!headers) {
      console.error('Could not get authentication headers');
    }
    return this.httpClient.post<Product>(
      `${this.baseURL}/${skuCode}`,
      product,
      { headers }
    );
  }

  getAllProducts(): Observable<Product[]> {
    const headers = this.authService.getHeaders();
    if (!headers) {
      console.error('Could not get authentication headers');
    }
    return this.httpClient.get<Product[]>(this.baseURL, { headers });
  }

  addProduct(product: Product): Observable<Product> {
    const headers = this.authService.getHeaders();
    return this.httpClient.post<Product>(`${this.baseURL}`, product, {
      headers,
    });
  }
}
