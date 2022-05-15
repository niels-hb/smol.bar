import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css'],
})
export class LoginDialogComponent {
  loading = false;

  constructor(
    private router: Router,
    private auth: AuthenticationService,
    public dialogRef: MatDialogRef<LoginDialogComponent>
  ) {}

  async signInWithGoogle() {
    try {
      this.loading = true;
      await this.auth.signInWithGoogle();
      this.closeDialog();
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  async signInWithGitHub() {
    try {
      this.loading = true;
      await this.auth.signInWithGitHub();
      this.closeDialog();
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  async signInAnonymously() {
    try {
      this.loading = true;
      await this.auth.signInAnonymously();
      this.closeDialog();
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  private closeDialog() {
    this.dialogRef.close();
  }
}
