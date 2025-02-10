import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class SigninComponent {
  credentials = { email: '', password: '' };

  constructor(private authService: AuthService, public router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe((res) => {
      localStorage.setItem('token', res.Accesstoken);
      localStorage.setItem('refreshToken',res.Refreshtoken)
      alert('Login successful!');
      this.router.navigate(['/home']);
    });
  }
}

