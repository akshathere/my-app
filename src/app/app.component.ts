import { Component, OnInit } from '@angular/core';
import { SharingService } from './app.services';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(public sharingService: SharingService) {
    
  }
  
  ngOnInit() : void {
  }
}
