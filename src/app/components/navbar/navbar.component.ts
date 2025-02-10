import { Component, inject } from '@angular/core';
import {  Router } from '@angular/router';
import { SharingService } from 'src/app/app.services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  route: string =''
  constructor(private router : Router,private sharingService: SharingService){
    sharingService.route=this.router.url
  }

  navi(path:string) {
    this.router.navigate([path]);
    this.sharingService.route=this.router.url
    console.log("redirtion tried")
  }
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(["/login"])
    this.sharingService.route=this.router.url
  }
}
