import { Component, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharingService } from 'src/app/app.services';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent {
  isDarkMode: boolean;
  switchTheme = new FormControl(false)
  @HostBinding('class') className = ''
  lightCLass='theme-light'
  darkCLass='theme-dark'
  constructor(private sharingService: SharingService) {
    this.isDarkMode = this.sharingService.isDarkModeEnabled();
  }

  toggleTheme() {
    // this.isDarkMode = !this.isDarkMode;
    // this.sharingService.toggleTheme();
    this.switchTheme.valueChanges.subscribe((currentMode) => {
      this.className= currentMode? this.darkCLass : this.lightCLass

      if(currentMode){
        
      }
    })
  }
}
