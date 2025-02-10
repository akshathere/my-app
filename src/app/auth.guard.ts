// auth.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './services/auth.services';

export const authGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  const authService= inject(AuthService)
  // 1) Retrieve the token from localStorage (or wherever you store it)
  const token = localStorage.getItem('token')
  if (!token) {
    router.navigate(['/login']);
    return false;
  }
  // 2) Decode the token. A JWT typically has three parts separated by dots
  const tokenParts = token.split('.');
  if (tokenParts.length !== 3) {
    // Not a valid JWT format
    router.navigate(['/login']);
    return false;
  }

  // 3) Extract the payload and check the `exp` field
  try {
    const payload = JSON.parse(atob(tokenParts[1])); // decode base64
    const exp = payload.exp; // e.g. 1680740221 (epoch time in seconds)
    const nowInSeconds = Math.floor(Date.now() / 1000); 
    
    if (!exp || nowInSeconds > exp) {
      // Token is expired
      authService.refreshAccessToken().subscribe(newToken=>{
        localStorage.setItem('token',newToken)
      })
      // router.navigate(['/login']);
      // return false;
    }
      // router.navigate(['/home']);
      console.log("valid")
      return true;
    // Token is valid and not expired
    
  } catch (error) {
    // Couldn’t decode or parse the token payload
    router.navigate(['/login']);
    return false;
  }
};
