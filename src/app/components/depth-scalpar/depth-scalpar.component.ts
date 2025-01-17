import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Component, Input, SimpleChanges } from '@angular/core';
import { MarketDepthData } from '../market-depth/market-depth.services';

@Component({
  selector: 'app-depth-scalpar',
  templateUrl: './depth-scalpar.component.html',
  styleUrls: ['./depth-scalpar.component.scss']
})
export class DepthScalparComponent {

dataSource: CdkTableDataSourceInput<any> = [];
  @Input() data?: MarketDepthData;
  displayedColumns: string[] = ['buyerQuantity', 'price', 'sellQuantity'];
  
  
  ngOnChanges(changes: SimpleChanges): void {
    // Check if the 'data' input has changed and is defined
    const combined = combineBuyersAndSellers(this.data);
    const outputArray = convertArrayToObject(combined);
    console.log(outputArray)
    console.log(combined)
    console.log("heudeudehu")
    if (changes['data'] && this.data) {
      this.dataSource = outputArray; // Assign when data is available
    }
  }
};
function combineBuyersAndSellers(data: any): any[] {
  const buyers = data.marketDepth?.buyers;
  const sellers = data.marketDepth?.sellers;

  // Combine buyers and sellers directly since lengths are equal
  return buyers.map((buyer :[], index: any) => [buyer, sellers[index]]);
}
function convertArrayToObject(array: any[][]): any[] {
  const result: any[] = [];

  array.forEach(([buyer, seller], index) => {
    // First 5 rows: Sell price and quantity
      result.push({
        price: seller.price,
        buyQuantity: null,
        sellQuantity: seller.quantity,
      });

  });
  result.reverse()
  array.forEach(([buyer, seller], index) => {
  result.push({
    price: buyer.price,
    buyQuantity: buyer.quantity,
    sellQuantity: null,
  });
});
  return result;
}

