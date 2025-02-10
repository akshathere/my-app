import { Component, Input, SimpleChanges } from '@angular/core';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { MarketDepthData } from 'src/app/app.services';


@Component({
  selector: 'app-market-modal',
  templateUrl: './market-modal.component.html',
  styleUrls: ['./market-modal.component.scss'],
})

export class MarketModalComponent {
  dataSource: CdkTableDataSourceInput<any> = [];
  @Input() data?: MarketDepthData | null;
  displayedColumns: string[] = ['buyerQuantity', 'Buy', 'Sell', 'sellerQuantity'];

  
  ngOnChanges(changes: SimpleChanges): void {
    // Check if the 'data' input has changed and is defined
    if(this.data==undefined){
      return
    }
    else{

    
    const combined = combineBuyersAndSellers(this.data);
    const outputArray = convertArrayToObject(combined);

    if (changes['data'] && this.data) {
      this.dataSource = outputArray; // Assign when data is available
    }
  }
  }
};
function combineBuyersAndSellers(data: any): any[] {
  const buyers = data.data.marketDepth?.buyers;
  const sellers = data.data.marketDepth?.sellers;
  // Combine buyers and sellers directly since lengths are equal
  return buyers.map((buyer :[], index: any) => [buyer, sellers[index]]);
}
function convertArrayToObject(array: any[][]): any[] {
  return array.map(([buyer, seller]) => ({
    buyerQuantity: buyer.quantity,
    Buy: buyer.price,
    Sell: seller.price,
    sellerQuantity: seller.quantity,
  }));

}
