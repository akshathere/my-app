import { Component } from '@angular/core';
import { MarketDepthData, MarketDepthService } from './market-depth.services';

@Component({
  selector: 'app-market-depth',
  templateUrl: './market-depth.component.html',
  styleUrls: ['./market-depth.component.scss'],
})
export class MarketDepthComponent {
  // This will store the market depth data for each symbol
  marketDepthData : Map<string, MarketDepthData> = new Map();


  // Define an array of symbols you want to fetch market depth for
  symbols: string[] = [
    'TCS',        'IBM',
  'TATA',       'TSLA',
  'AAPL',       'GOOGL',
  'AMZN',       'NFLX',
  'RELIANCE',   'INFY',
  'HDFC',       'ICICIBANK',
  'SBIN',       'TATAMOTORS',
  'BHARTIARTL', 'WIPRO',
  'HCLTECH',    'HDFCBANK'
  ];

  selectedSymbol!: string;

  // Define other parameters like priceRange, numOrders, and maxQuantity
  priceRange = 5.50; // Double value for price range
  numOrders = 5; // Integer value for number of orders
  maxQuantity = 1000; // Integer value for max quantity at a price
  
  constructor(private marketDepthService: MarketDepthService) {
  }
  ngOnInit(): void {
    // Fetch data immediately
    this.fetchMarketDepthForAllSymbols();
    setInterval(() => {
      this.fetchMarketDepthForAllSymbols();
    }, 30000)
  }
  // Function to fetch market depth for each symbol in the symbols array
  
  fetchMarketDepthForAllSymbols(): void {
    this.symbols.forEach((symbol) => {
      this.marketDepthService
        .getMarketDepth(
          symbol,
          this.priceRange,
          this.numOrders,
          this.maxQuantity
        )
        .subscribe({
          next: (data) => {
            // Update the market depth data for the specific symbol
            console.log(this.marketDepthData)
            this.marketDepthData.set(symbol, data);
          },
          error: (error) => console.error(`Failed to fetch market depth for ${symbol}`, error),
        });
    });
  }

  selectSymbolIndex = (symbol: string) => this.selectedSymbol = symbol;
}
