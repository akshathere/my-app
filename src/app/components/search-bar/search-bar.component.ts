import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MarketDepthData, SharingService } from 'src/app/app.services';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  query = new FormControl('');
  symbolList: { name: string; isAdded: boolean }[] = [];
  symbolData?: MarketDepthData;
  selectedSymbol: string | null = '';
  private debounceTimer: any;
  constructor(private sharingService: SharingService) {
  }
  ngOnInit(): void {
    this.sharingService.getFilteredData(this.query.value!).subscribe((data) => {
      this.symbolList = data
    })
    
    this.sharingService.fetchMarketDepthForAllSymbols();
    setInterval(() => {
      this.sharingService.fetchMarketDepthForAllSymbols();
    }, 300000)

  }
  selectSymbol(symbolName:string):void{
    if(this.selectedSymbol==symbolName) this.selectedSymbol='' 
    else
    this.selectedSymbol=symbolName
    // this.sharingService.selectSymbolIndex(symbolName)
    // this.selectedSymbol = localStorage.getItem('selectedSymbol')
    
  }
  onSearchInput(): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {

        this.sharingService.getFilteredData(this.query.value!).subscribe((data) => {
          this.symbolList = data
        })
    }, 1000);
  }
  getMarketDepthDataForSymbol(symbol: string| null) {
    const foundItem = this.sharingService.marketDepthDataArray.find(item => item.symbol === symbol);
    return foundItem?.data;
  }
  addSymbol(symbol: string): void {
    this.sharingService.AddData({ name: symbol, isAdded: true }).subscribe((data) => {
      const index = this.symbolList.findIndex((item) => item.name === symbol);
      if (index > -1) {
        this.symbolList[index].isAdded = true;
      }
    })
  }

  removeSymbol(symbol: string): void {
    this.sharingService.RemoveData({ name: symbol, isAdded: false }).subscribe((data) => {
      const index = this.symbolList.findIndex((item) => item.name === symbol);
      if (index > -1) {
        this.symbolList[index].isAdded = false;
      }
    })
  }
}
