// already-auth.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const token = localStorage.getItem('token');

    if (token) {
        try {
            const tokenParts = token.split('.');
            const payload = JSON.parse(atob(tokenParts[1]));
            const exp = payload.exp;
            const nowInSeconds = Math.floor(Date.now() / 1000);

            // Check if token is still valid
            if (exp && nowInSeconds <= exp) {
                // User is already logged in
                router.navigate(['/home']);
                return false; // Prevent navigation to login
            }
        } catch (error) {
            // Invalid token format
        }
    }
    // No valid token found; allow navigation to login
    return true;
};
