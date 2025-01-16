import { Component, Input } from '@angular/core';
import { MarketDepthData } from '../market-depth/market-depth.services';

@Component({
  selector: 'app-market-modal',
  templateUrl: './market-modal.component.html',
  styleUrls: ['./market-modal.component.sass'],
})
export class MarketModalComponent {

  @Input() data?: MarketDepthData;
}
