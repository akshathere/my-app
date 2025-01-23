import { Component, OnInit } from '@angular/core';
import { MarketDepthData, SharingService } from 'src/app/app.services';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-market-depth',
  templateUrl: './market-depth.component.html',
  styleUrls: ['./market-depth.component.scss'],
})
export class MarketDepthComponent implements OnInit {
  constructor(private sharingService: SharingService) {
  }

  query = new FormControl('');
  selectedSymbol: string|null = '';

  priceRange = 5.50;
  numOrders = 5;
  maxQuantity = 1000;
  symbolList: { name: string; isAdded: boolean }[] = [];


  symbolData?: MarketDepthData;

  ngOnInit(): void {
    this.sharingService.getTotalSymbolsdata()
    this.sharingService.GetWishlist().subscribe((data) => {
      this.symbolList = data;
    })
    this.selectedSymbol=localStorage.getItem('selectedSymbol')
    this.sharingService.fetchMarketDepthForAllSymbols();
    setInterval(() => {
      this.sharingService.fetchMarketDepthForAllSymbols();
    }, 300000)

  }
  // Function to fetch market depth for each symbol in the symbols array

  


  selectSymbolIndex(symbol: string): void {
    this.sharingService.selectSymbolIndex(symbol);
    this.selectedSymbol=localStorage.getItem('selectedSymbol')
  }

  getMarketDepthDataForSymbol(symbol: string|null) {
    const foundItem = this.sharingService.marketDepthDataArray.find(item => item.symbol === symbol);
    return foundItem?.data;
  }

  addSymbol(symbol: string|null): void {
    this.sharingService.AddData({ name: symbol, isAdded: true }).subscribe(() => {
      this.sharingService.GetWishlist().subscribe((data) => {
        this.symbolList = data;
      })
    })
  }

  removeSymbol(symbol: string|null): void {
    this.sharingService.RemoveData({ name: symbol, isAdded: false }).subscribe((data) => {
      this.sharingService.GetWishlist().subscribe((data) => {
        this.symbolList = data;
      })
    })
  }

  

}
