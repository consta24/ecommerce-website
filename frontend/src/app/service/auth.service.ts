import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/User';
import { Observable } from 'rxjs';
import { Token } from '../model/Token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = 'http://localhost:8080/api/auth';
  private tokenKey = 'authToken';
  private userKey = 'username';
  private adminKey = 'isAdmin';

  constructor(private httpClient: HttpClient) {}

  registerUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseURL}/register`, user);
  }

  loginUser(user: User): Observable<Token> {
    return this.httpClient.post<Token>(`${this.baseURL}/login`, user);
  }

  retrieveUser(username: String): Observable<User> {
    const headers = this.getHeaders();
    if (!headers) {
      console.error('Could not get authentication headers');
    }
    console.log(headers);
    return this.httpClient.get<User>(`${this.baseURL}/${username}`, {
      headers,
    });
  }

  getUsers(): Observable<User[]> {
    const headers = this.getHeaders();
    if (!headers) {
      console.error('Could not get authentication headers');
    }
    return this.httpClient.get<User[]>(`${this.baseURL}/users`, {
      headers,
    });
  }

  saveUser(username: string): void {
    localStorage.setItem(this.userKey, username);
  }

  saveAdmin(isAdmin: boolean | undefined) {
    let value = 'no';
    console.log(isAdmin);
    if (isAdmin === true) {
      value = 'yes';
    }
    localStorage.setItem(this.adminKey, value);
  }

  getUser(): string | undefined {
    const user = localStorage.getItem(this.userKey);
    if (user) {
      return user;
    }
    return undefined;
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | undefined {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      return token;
    }
    return undefined;
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return this.getToken() ? true : false;
  }

  isAdmin() {
    return localStorage.getItem(this.adminKey) === 'yes';
  }

  getHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
}
