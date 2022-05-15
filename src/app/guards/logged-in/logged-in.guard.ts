import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';

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
    const currentUser: User | null = this.auth.currentUser$.getValue();

    const loggedIn = currentUser != null;
    const anonymous = currentUser?.isAnonymous ?? false;

    const canActivate = loggedIn && !anonymous;

    if (!canActivate) {
      this.router.navigateByUrl('/');
    }

    return canActivate;
  }
}
