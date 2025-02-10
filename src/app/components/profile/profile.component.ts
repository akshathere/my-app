import { Component, OnInit } from '@angular/core';
import { SharingService, User } from 'src/app/app.services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  errorMessage: string | null = null;

  constructor(private sharingService: SharingService) {}

  ngOnInit() {
    // Call your backend to fetch the user’s profile
    this.sharingService.getProfileData().subscribe({
      next: (data: User) => {
        this.user = data;
        console.log(this.user)
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
        this.errorMessage = 'Failed to load profile.';
      },
    });
  }
}
