import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Inventory } from '../model/Inventory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private baseURL = 'http://localhost:8080/api/inventory';

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  getInventory(): Observable<Inventory[]> {
    const headers = this.authService.getHeaders();
    if (!headers) {
      console.error('Could not get authentication headers');
    }
    return this.httpClient.get<Inventory[]>(this.baseURL, { headers });
  }

  editQuantity(skuCode: string, quantity: number): Observable<Inventory> {
    const headers = this.authService.getHeaders();
    if (!headers) {
      console.error('Could not get authentication headers');
    }
    return this.httpClient.post<Inventory>(
      `${this.baseURL}/${skuCode}`,
      quantity,
      { headers }
    );
  }
}
