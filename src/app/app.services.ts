import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Observable } from 'rxjs';
export interface SymbolData {
  name: string,
  isAdded: boolean
}
export interface Symbols {
  name: string
}
export interface Stock {
  id: number;
  symbol: string;
  name: string;
}

export interface Wishlist {
  id: number;
  type: string;
  createdAt: string; // or Date if you convert it
  stock: Stock;
}

export interface User {
  id: number;
  username: string;
  email: string;
  wishlists: Wishlist[];
}
export interface MarketDepthData {
  lastTradePrice: number;
  marketDepth: {
    buyers: { price: number; quantity: number }[] | undefined;
    sellers: { price: number; quantity: number }[] | undefined;
  } | null;
}
@Injectable({
  providedIn: 'root',
})
export class SharingService {
  searchResults: { name: string; isAdded: boolean }[] = [];
  totalSymbols: { name: string; isAdded: boolean }[] = []
  symbols: { name: string }[] = []
  selectedSymbolDepth: MarketDepthData = {
    lastTradePrice: 0,
    marketDepth: {
      buyers: [],
      sellers: [],
    },
  };
  router = inject(Router)
  route: string = ''
  private readonly API_URL = 'http://localhost:3000/api/stocks/market-depth/';
  private readonly DATA_URL = 'http://localhost:3000/mm';
  constructor(private http: HttpClient) { this.loadTheme();}
  private darkMode = false;
  getProfileData(): Observable<User> {
    return this.http.get<User>(`${this.DATA_URL}/profile`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      }
    );
  }
  private darkModeKey = 'dark-mode'; // Key for localStorage
  private isDarkMode = false;

  private loadTheme() {
    const savedTheme = localStorage.getItem(this.darkModeKey);
    this.isDarkMode = savedTheme === 'true';
    this.updateTheme();
  }

  toggleTheme() {
    
    this.isDarkMode = !this.isDarkMode;
    console.log(this.isDarkMode)
    localStorage.setItem(this.darkModeKey, this.isDarkMode.toString());
    this.updateTheme();
  }

  private updateTheme() {
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  isDarkModeEnabled(): boolean {
    return this.isDarkMode;
  }
  marketDepthDataArray: { symbol: string; data: MarketDepthData }[] = [];
  // fetchMarketDepthForAllSymbols(): void {
  //   this.getMarketDepth().subscribe((res: { symbol: string; data: MarketDepthData }[]) => {
  //     this.marketDepthDataArray = res; // Use `symbol.name`
  //   })
  // }
  // fetchAllSymbols(): void {
  //   this.http.get<Symbols[]>(
  //     `${this.DATA_URL}/getSymbols/`,
  //   ).subscribe(data => {
  //     this.symbols = data;
  //   })
  // }
  getMarketDepthDataForSymbol(symbol: string | null) {
    return this.http.post<MarketDepthData>(
      `${this.API_URL}`,
      { symbol }
    )

  }

  // getMarketDepth() {
  //   return this.http.get<{ symbol: string; data: MarketDepthData }[]>(
  //     `${this.API_URL}`,
  //   );
  // }
  getMarketDepthForSymbol(symbol: string) {
    const filtered = this.marketDepthDataArray.find((item) => item.symbol === symbol);
    return filtered ? filtered.data : null;
  }
  getInitialFilteredData(data:{ symbolName: string, type: string}): Observable<SymbolData[]> {
    return this.http.post<SymbolData[]>(
      `${this.DATA_URL}/symbolData/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      }
    );

  }
  AddData(data: { name: string | null, type: string}): Observable<MarketDepthData> {
    return this.http.post<MarketDepthData>(
      `${this.DATA_URL}/addData/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      }
    );
  }
  RemoveData(data: { name: string | null, type: string }): Observable<MarketDepthData> {
    return this.http.post<MarketDepthData>(
      `${this.DATA_URL}/removeData/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      }
    );
  }
  GetWishlist(type: string): Observable<SymbolData[]> {
    return this.http.post<SymbolData[]>(
      `${this.DATA_URL}/wishlist/`,
      {type: type},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      }
    );
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {

      return false;
    }

    // 2) Decode the token. A JWT typically has three parts separated by dots
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {

      return false;
    }

    // 3) Extract the payload and check the `exp` field
    try {
      const payload = JSON.parse(atob(tokenParts[1])); // decode base64
      const exp = payload.exp; // e.g. 1680740221 (epoch time in seconds)
      const nowInSeconds = Math.floor(Date.now() / 1000);

      if (!exp || nowInSeconds > exp) {
        // Token is expired
        return false;
      }

      // Token is valid and not expired
      return true;
    } catch (error) {

      return false;
    }
  }
  routeCheck(){
    return this.router.url
  }
  
}
