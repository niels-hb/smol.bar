import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let currentUser: User | null = this.auth.currentUser$.getValue();

    let loggedIn = currentUser != null;
    let anonymous = currentUser?.isAnonymous ?? false;

    let canActivate = loggedIn && !anonymous;

    if (!canActivate) {
      this.router.navigateByUrl('/');
    }

    return canActivate;
  }
}
