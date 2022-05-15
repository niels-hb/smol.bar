import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  loggedIn: boolean = false;

  constructor(
    private router: Router,
    public auth: AuthenticationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

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
