import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
export class MarketDepthService {
  private readonly API_URL = 'http://localhost:3000/api/stocks/market-depth';

  constructor(private http: HttpClient) {}

  getMarketDepth(symbol: string, priceRange: number, numOrders: number, maxQuantity: number): Observable<MarketDepthData> {
    return this.http.get<MarketDepthData>(
      `${this.API_URL}/${symbol}?`,
      { responseType: 'json' } // Ensure the response is parsed as JSON
    );
  }
  
}