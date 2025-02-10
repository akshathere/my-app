import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.services';
import { SharingService } from '../app.services';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private sharingService: SharingService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        switch (err.status) {
          case 400:
            // Handle 400 - Bad Request
            console.error('Bad Request:', err);
            // e.g., you might display a user-friendly message or log details
            break;

          case 403:
            // Handle token refresh for 403 - Forbidden
            return this.authService.refreshAccessToken().pipe(
              switchMap(newToken => {
                console.log('Token refreshed:', newToken);
                // Clone the original request with the new token
                const clonedRequest = request.clone({
                  setHeaders: { Authorization: `Bearer ${newToken.Accesstoken}` }
                });
                // Store new token locally
                localStorage.setItem('token', newToken.Accesstoken);
                this.sharingService.isLoggedIn();
                // Retry the request with the refreshed token
                return next.handle(clonedRequest);
              }),
              catchError(refreshError => {
                console.error('Token refresh failed:', refreshError);
                // Optionally log out or redirect
                return throwError(refreshError);
              })
            );

          case 404:
            // Handle 404 - Not Found
            console.error('Not Found:', err);
            this.router.navigate(['/error/notFound']);
            // Optionally navigate to a 404 page or show a friendly message
            break;

          case 500:
            // Handle 500 - Internal Server Error
            console.error('Internal Server Error:', err);
            this.router.navigate(['/error/internal']);
            break;

          default:
            // For other errors, simply pass them along
            break;
        }

        // If we haven't returned already (e.g. from refresh logic), rethrow the error
        return throwError(() => err);
      })
    ) as Observable<HttpEvent<any>>;
  }
}
