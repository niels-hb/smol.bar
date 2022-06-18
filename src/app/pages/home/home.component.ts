import { Firestore, Timestamp, doc, setDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Redirect, redirectConverter } from 'src/models/redirect';
import { Component } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Metadata } from 'src/models/metadata';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  today: Date = new Date();

  loading = false;

  error: FirebaseError | undefined;

  createRedirectForm: FormGroup;

  constructor(private firestore: Firestore) {
    this.createRedirectForm = this.createFormGroup();
  }

  get url() {
    return (
      'https://smol.bar/r/' + this.createRedirectForm.get('id')?.value ??
      'invalid'
    );
  }

  async createRedirect() {
    if (this.createRedirectForm.valid) {
      const redirect = new Redirect(
        this.createRedirectForm.get('target')?.value ?? '',
        Number.parseInt(this.createRedirectForm.get('delay')?.value) ?? -1,
        this.createRedirectForm.get('expiresAt')?.value ?? Timestamp.now(),
        this.createRedirectForm.get('message')?.value ?? null,
        new Metadata(Timestamp.now())
      );

      const id = this.createRedirectForm.get('id')?.value ?? this.generateId();
      try {
        this.loading = true;
        await setDoc(
          doc(this.firestore, `redirects/${id}`).withConverter(
            redirectConverter
          ),
          redirect
        );
      } catch (e) {
        if (e instanceof FirebaseError) {
          this.error = e;
        }

        throw e;
      } finally {
        this.loading = false;
      }
    }
  }

  resetForm() {
    this.createRedirectForm = this.createFormGroup();
  }

  private generateId(length = 8): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  private createFormGroup() {
    return new FormGroup({
      id: new FormControl(this.generateId(), [Validators.required]),
      target: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/
        ),
      ]),
      delay: new FormControl(3, [
        Validators.required,
        Validators.pattern(/^\d*$/),
        Validators.min(0),
        Validators.max(60),
      ]),
      expiresAt: new FormControl(new Date(), [Validators.required]),
      message: new FormControl(),
    });
  }
}
