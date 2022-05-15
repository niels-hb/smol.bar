import { Injectable } from '@angular/core';
import {
  Auth,
  AuthProvider,
  signInWithPopup,
  User,
  UserCredential,
} from '@angular/fire/auth';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithRedirect,
} from '@firebase/auth';
import { BehaviorSubject } from 'rxjs';

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

  private listenToAuthStateChanges() {
    this.auth.onAuthStateChanged((user) => {
      this.currentUser$.next(user);
    });
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

  private openPopup(provider: AuthProvider): Promise<UserCredential> {
    return signInWithPopup(this.auth, provider);
  }

  logout() {
    return this.auth.signOut();
  }

  getUid() {
    return this.currentUser$.getValue()?.uid ?? 'anonymous';
  }
}
