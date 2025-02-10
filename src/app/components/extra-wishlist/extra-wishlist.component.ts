import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MarketDepthData, SharingService } from 'src/app/app.services';
import { SymbolItem } from '../home/home.component';

@Component({
  selector: 'app-extra-wishlist',
  templateUrl: './extra-wishlist.component.html',
  styleUrls: ['./extra-wishlist.component.scss']
})
export class ExtraWishlistComponent implements OnInit, OnDestroy {
  query = new FormControl('');
  filterSymbolList: { name: string; isAdded: boolean }[] = [];
  symbolList: { name: string; isAdded: boolean }[] = [];
  wishlistData: { name: string; isAdded: boolean }[] = [];
  symbolData?: MarketDepthData;
  dataInterval: any;
  selectedSymbolData: MarketDepthData | null = null;
  isLoading: boolean = false;
  selectedSymbol: string | null = '';
  panelExpanded: boolean = false;
  private debounceTimer: any;
  constructor(private sharingService: SharingService) {
    this.isDarkMode = this.sharingService.isDarkModeEnabled();
  }
  isDarkMode: boolean = false;
  showDepth: boolean = false;
  depthSymbol: string | null = null
  depthData: MarketDepthData | null = null
  ngOnInit(): void {
    if (!this.selectedSymbolData)
      this.sharingService.getInitialFilteredData({symbolName: this.query.value!,type: 'wishlist1' } ).subscribe((data) => {
        this.symbolList = data
      })
    this.sharingService.GetWishlist('wishlist1' ).subscribe((data) => {
      this.wishlistData = data;
      console.log(this.wishlistData)
    })
    this.isDarkMode = this.sharingService.isDarkModeEnabled();
  }
  ngOnDestroy() {
    if (this.dataInterval) {
      clearInterval(this.dataInterval);
      this.dataInterval = null;
    }
  }
  expansionPanelTriggered() {
    this.panelExpanded = !this.panelExpanded;
    console.log(" expansion pannel triggered called and pannel expanded = ",this.panelExpanded)
    if(this.showDepth){
      
      this.showDepth=false;
      console.log(" show depth changed to false")
    }

  }
  selectSymbol(symbolName: string | null): void {
    if (symbolName && this.selectedSymbol !== symbolName) {

      this.isLoading = true; // Set loading state
      this.selectedSymbol = symbolName;
      this.selectedSymbolData = null; // Reset previous data
      // Fetch data for the selected symbol
      this.sharingService.getMarketDepthDataForSymbol(symbolName).subscribe(
        (data) => {
          this.selectedSymbolData = data; // Set the data
          this.startGettingData(true)
          this.isLoading = false; // Clear the loading state
        },
        (error) => {
          console.error('Error fetching symbol data:', error);
          this.isLoading = false; // Clear the loading state even on error
        }
      );
    }
    else if (symbolName && this.selectedSymbol === symbolName) {
      this.selectedSymbol = ''
      this.startGettingData(false)
    }
  }
  startGettingData(signal: boolean) {
    if (signal) {
      console.log("start getting data")
      // Start the interval only if it's not already running
      if (!this.dataInterval) {
        this.dataInterval = setInterval(() => {
          this.getData(this.selectedSymbol);
        }, 3000);
      }
    } else {
      console.log("stop getting data")
      // Stop the interval if it's running
      if (this.dataInterval) {
        clearInterval(this.dataInterval);
        this.dataInterval = null;
      }
    }
  }
  stopExpansion(event: MouseEvent) {
    // Prevent the Material expansion-panel from toggling
    event.stopPropagation();
  }
  handleEvent(event: MouseEvent){
    event.view
  }
  showDepthScalpar(symbolName: string | null) {
    console.log(this.panelExpanded,"panel is expanded")
    console.log(this.showDepth,"depth is expanded")

    if (this.panelExpanded){
      if(symbolName!=this.selectedSymbol){
        this.showDepth=true;
        console.log("show depth ")
        this.selectSymbol(symbolName)
      }else
      this.showDepth = !this.showDepth;
    }
    else {
      this.selectSymbol(symbolName)
      this.showDepth = !this.showDepth;
      this.panelExpanded=!this.panelExpanded
    }


  }
  onSearchInput(): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      console.log(this.query.value)
      this.filterSymbolList = this.symbolList.filter((symbol) => {
        return symbol.name.toLowerCase().includes(this.query.value!) // Filter symbols based on the query
      });
      if (this.query.value === '') this.filterSymbolList = []
    }, 500);
  }
  getData(symbol: string | null) {
    this.sharingService.getMarketDepthDataForSymbol(symbol).subscribe((data) => {
      this.selectedSymbolData = data
    })
  }
  get filteredSymbols() {
    this.wishlistData = this.symbolList.filter(symbol => symbol.isAdded)
    return this.wishlistData;
  }
  stopper(symbolName: string){
    console.log(symbolName,this.selectedSymbol, " symbols ")
    if(this.selectedSymbol==symbolName){
      this.showDepth=false;
      if(this.dataInterval)
      this.startGettingData(false)
    }
  }
  addSymbol(symbol: string): void {
    this.sharingService.AddData({ name: symbol, type: 'wishlist1' }).subscribe((data) => {
      const fullSymbol = this.symbolList.find(item => item.name === symbol);
      console.log(data, "add symbol")
      if (fullSymbol) {
        fullSymbol.isAdded = true;
      }

      // Update in the filtered list by finding the matching symbol (if it exists)
      const filteredSymbol = this.filterSymbolList.find(item => item.name === symbol);
      if (filteredSymbol) {
        filteredSymbol.isAdded = true;
      }

      console.log(this.filteredSymbols)
    })
  }

  removeSymbol(symbol: string): void {
    console.log(symbol)
    if(this.selectedSymbol==symbol){
      this.showDepth=false;
      if(this.dataInterval)
      this.startGettingData(false)
    }
    this.sharingService.RemoveData({ name: symbol,type: 'wishlist1' }).subscribe((data) => {
      const fullSymbol = this.symbolList.find(item => item.name === symbol);
      if (fullSymbol) {
        fullSymbol.isAdded = false;
      }

      // Update in the filtered list by finding the matching symbol (if it exists)
      const filteredSymbol = this.filterSymbolList.find(item => item.name === symbol);
      if (filteredSymbol) {
        filteredSymbol.isAdded = false;
      }
      console.log(this.filteredSymbols)

    })
  }
  drop(event: CdkDragDrop<SymbolItem[]>) {
    if (event.previousIndex !== event.currentIndex) {
      // Reorder the array in place
      moveItemInArray(this.wishlistData, event.previousIndex, event.currentIndex);
    }
  }
}
