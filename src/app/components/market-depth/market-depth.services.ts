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
  private readonly DATA_URL = 'http://localhost:3000/mm';
  
  constructor(private http: HttpClient) {

  }

  
  
}