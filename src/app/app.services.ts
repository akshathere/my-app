import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
export interface SymbolData {
    name: string,
    isAdded: boolean
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
  

  private readonly API_URL = 'http://localhost:3000/api/stocks/market-depth';
  private readonly DATA_URL = 'http://localhost:3000/mm';
  constructor(private http: HttpClient) {}
  marketDepthDataArray: { symbol: string; data: MarketDepthData }[] = [];
  fetchMarketDepthForAllSymbols(): void {
      this.getMarketDepth().subscribe((res: { symbol: string; data: MarketDepthData }[]) => {
        this.marketDepthDataArray = res; // Use `symbol.name`
            console.log(res)
  })
}

  getTotalSymbolsdata(): void{
     this.http.get<SymbolData[]>(
      `${this.DATA_URL}/getTotalSymbolsData`,
    ).subscribe(data =>{
      this.totalSymbols=data
    })
  }
  selectSymbolIndex(symbol: string): void {
    if (localStorage.getItem('selectedSymbol') === symbol) {
      localStorage.setItem('selectedSymbol','')   // Clear selected symbol if clicked again
    } else {
      localStorage.setItem('selectedSymbol',symbol) ;
      console.log("set set")
    }
  }
  getMarketDepthDataForSymbol(symbol: string) {
    const foundItem = this.marketDepthDataArray.find(item => item.symbol === symbol);
    return foundItem?.data;
  }

  getMarketDepth() {
      return this.http.get<{ symbol: string; data: MarketDepthData }[]>(
        `${this.API_URL}`,
      );
    }
  getMarketDepthForSymbol(symbol : string){
    const filtered = this.marketDepthDataArray.find((item) => item.symbol === symbol);
    return filtered ? filtered.data : null;
  }
  getFilteredData(symbolName:string): Observable<SymbolData[]> {
      return this.http.post<SymbolData[]>(
        `${this.DATA_URL}/filteredData`,
        {query:symbolName}
      );
    }
    AddData(symbol : {name: string|null, isAdded: boolean}): Observable<MarketDepthData> {
      return this.http.post<MarketDepthData>(
        `${this.DATA_URL}/addData`,
        symbol,
      );
    }
    RemoveData(symbol : {name: string|null, isAdded: boolean}): Observable<MarketDepthData> {
      return this.http.post<MarketDepthData>(
        `${this.DATA_URL}/removeData`,
        symbol,
      );
    }
    GetWishlist(): Observable<SymbolData[]> {
      return this.http.get<SymbolData[]>(
        `${this.DATA_URL}/wishlist`,
      );
    }
}
