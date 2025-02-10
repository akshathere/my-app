import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth'; // Backend API URL

  constructor(private http: HttpClient) {}

  signup(user: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, user);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  getAllStocks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/stocks`);
  }

  getWishlist(): Observable<any> {
    return this.http.get(`${this.baseUrl}/wishlist`);
  }

  addToWishlist(stockId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/wishlist`, { stockId });
  }

  removeFromWishlist(stockId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/wishlist/${stockId}`);
  }
  refreshAccessToken(): Observable<any>{
    const refreshToken= localStorage.getItem('refreshToken')
    console.log("refresh token called")
    return this.http.post<{Accesstoken: string}>(
      `${this.baseUrl}/refresh`, 
      {token : refreshToken}
    )
  }
}
