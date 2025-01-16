import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  source : string="assets/MainAfter.jpg";
  hideImage: boolean = false;
  hid=()=>{
    this.hideImage=!this.hideImage;
  }
  data:string="ipo"
  search=(event:Event)=>{
    // console.log((<HTMLInputElement>event.target).value )
    this.data=(<HTMLInputElement>event.target).value;
  }
  title = 'my-app';
}
