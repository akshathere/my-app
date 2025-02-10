import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  credentials = { username: '', email: '', password: '' };

  constructor(private authService: AuthService, public router: Router) {}

  signup() {
    this.authService.signup(this.credentials).subscribe(() => {
      alert('Signup successful! Please log in.');
      this.router.navigate(['/login']);
    });
  }
}
