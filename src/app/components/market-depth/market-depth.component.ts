import { Component } from '@angular/core';
import { MarketDepthData, MarketDepthService } from './market-depth.services';

@Component({
  selector: 'app-market-depth',
  templateUrl: './market-depth.component.html',
  styleUrls: ['./market-depth.component.scss'],
})
export class MarketDepthComponent {
  // This will store the market depth data for each symbol
  marketDepthDataArray: { symbol: string; data: MarketDepthData }[] = [];



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
    }, 3000)
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
            const index = this.marketDepthDataArray.findIndex((item) => item.symbol === symbol);
            if (index !== -1) {
              // Update existing data
              this.marketDepthDataArray[index].data = data;
            } else {
              // Add new data
              this.marketDepthDataArray.push({ symbol, data });
            }
          },
          error: (error) => console.error(`Failed to fetch market depth for ${symbol}`, error),
        });
    });
  }

  selectSymbolIndex(symbol: string): void {
    this.selectedSymbol = symbol;
  }
  getMarketDepthDataForSymbol(symbol: string): MarketDepthData | undefined {
    const foundItem = this.marketDepthDataArray.find(item => item.symbol === symbol);
    return foundItem?.data;
  }
}
