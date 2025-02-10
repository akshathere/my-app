import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MarketModalComponent } from './components/market-modal/market-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { DepthScalparComponent } from './components/depth-scalpar/depth-scalpar.component';
import { SearchBarComponent } from './components/home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatIconModule } from '@angular/material/icon';
import { SharingService } from './app.services';
import { MatButtonModule } from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SigninComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {AsyncPipe} from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import { TokenInterceptor } from './services/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { ExtraWishlistComponent } from './components/extra-wishlist/extra-wishlist.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MatCardModule } from '@angular/material/card';
import { InternalServerErrorPageComponent } from './errorPages/internal-server-error-page/internal-server-error-page.component';
import { NotFoundComponent } from './errorPages/not-found/not-found.component';
@NgModule({
  declarations: [
    AppComponent,
    MarketModalComponent,
    DepthScalparComponent,
    SearchBarComponent,
    NavbarComponent,
    SigninComponent,
    SignupComponent,
    ThemeToggleComponent,
    ExtraWishlistComponent,
    ProfileComponent,
    InternalServerErrorPageComponent,
    NotFoundComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatListModule,
    MatRippleModule,
    MatExpansionModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    DragDropModule,
    MatToolbarModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatMenuModule,
    AppRoutingModule,
    MatCardModule
  ],
  providers: [ SharingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
