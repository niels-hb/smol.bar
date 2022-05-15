import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Component } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css'],
})
export class LoginDialogComponent {
  loading = false;

  error: FirebaseError | null = null;

  constructor(
    private auth: AuthenticationService,
    public dialogRef: MatDialogRef<LoginDialogComponent>
  ) {}

  async signInWithGoogle() {
    this.error = null;

    try {
      this.loading = true;
      await this.auth.signInWithGoogle();
      this.closeDialog();
    } catch (e) {
      if (e instanceof FirebaseError) {
        this.error = e;
      } else {
        throw e;
      }
    } finally {
      this.loading = false;
    }
  }

  async signInWithGitHub() {
    this.error = null;

    try {
      this.loading = true;
      await this.auth.signInWithGitHub();
      this.closeDialog();
    } catch (e) {
      if (e instanceof FirebaseError) {
        this.error = e;
      } else {
        throw e;
      }
    } finally {
      this.loading = false;
    }
  }

  async signInAnonymously() {
    this.error = null;

    try {
      this.loading = true;
      await this.auth.signInAnonymously();
      this.closeDialog();
    } catch (e) {
      if (e instanceof FirebaseError) {
        this.error = e;
      } else {
        throw e;
      }
    } finally {
      this.loading = false;
    }
  }

  private closeDialog() {
    this.dialogRef.close();
  }
}
