// root-redirect.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const rootRedirectGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const token = localStorage.getItem('token');

    if (token) {
        try {
            const tokenParts = token.split('.');
            const payload = JSON.parse(atob(tokenParts[1]));
            const exp = payload.exp;
            const nowInSeconds = Math.floor(Date.now() / 1000);

            // If token is valid, redirect to /home
            if (exp && nowInSeconds <= exp) {
                router.navigate(['/home']);
                return false;
            }
        } catch (error) {
            // Invalid token format
        }
    }

    // If no valid token, redirect to /login
    router.navigate(['/login']);
    return false;
};
