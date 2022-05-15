import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Component } from '@angular/core';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  loggedIn = false;

  constructor(
    private router: Router,
    public auth: AuthenticationService,
    public dialog: MatDialog
  ) {}

  home() {
    this.router.navigateByUrl('/');
  }

  login() {
    this.dialog.open(LoginDialogComponent);
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }

  profile() {
    this.router.navigateByUrl('/profile');
  }

  stats() {
    this.router.navigateByUrl('/stats');
  }
}
