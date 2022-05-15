import {
  Auth,
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  User,
  UserCredential,
  signInAnonymously,
  signInWithPopup,
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  currentUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );

  constructor(private auth: Auth) {
    this.listenToAuthStateChanges();
  }

  signInWithGoogle(): Promise<UserCredential> {
    return this.openPopup(new GoogleAuthProvider());
  }

  signInWithGitHub(): Promise<UserCredential> {
    return this.openPopup(new GithubAuthProvider());
  }

  signInAnonymously(): Promise<UserCredential> {
    return signInAnonymously(this.auth);
  }

  logout() {
    return this.auth.signOut();
  }

  getUid() {
    return this.currentUser$.getValue()?.uid ?? 'anonymous';
  }

  private listenToAuthStateChanges() {
    this.auth.onAuthStateChanged((user) => {
      this.currentUser$.next(user);
    });
  }

  private openPopup(provider: AuthProvider): Promise<UserCredential> {
    return signInWithPopup(this.auth, provider);
  }
}
