import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { loginGuard } from './login.guard';
import { SigninComponent } from './components/login/login.component';
import { SearchBarComponent } from './components/home/home.component';
import { authGuard } from './auth.guard';
import { rootRedirectGuard } from './root.guard';
import { ExtraWishlistComponent } from './components/extra-wishlist/extra-wishlist.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InternalServerErrorPageComponent } from './errorPages/internal-server-error-page/internal-server-error-page.component';
import { NotFoundComponent } from './errorPages/not-found/not-found.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent ,canActivate: [loginGuard] },
    { path: 'login', component: SigninComponent ,canActivate: [loginGuard]},
    { path: 'home', component: SearchBarComponent ,canActivate:[authGuard] },
    { path: 'extraWishList', component: ExtraWishlistComponent ,canActivate:[authGuard] },
    { path: 'profile', component: ProfileComponent ,canActivate:[authGuard] },
    { path: '', component: SearchBarComponent ,canActivate:[rootRedirectGuard] },
    { path: 'error/internal', component: InternalServerErrorPageComponent  },
    { path: 'error/notFound', component: NotFoundComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
