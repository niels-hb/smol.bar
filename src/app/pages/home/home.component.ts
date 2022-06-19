import { Firestore, Timestamp, doc, setDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Redirect, redirectConverter } from 'src/models/redirect';
import { Clipboard } from '@angular/cdk/clipboard';
import { Component } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Metadata } from 'src/models/metadata';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  loading = false;

  error: FirebaseError | undefined;

  createRedirectForm = new FormGroup({
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
    expiresAt: new FormControl('', [Validators.required]),
    message: new FormControl(),
  });

  constructor(private firestore: Firestore, private clipboard: Clipboard) {}

  async createRedirect() {
    if (this.createRedirectForm.valid) {
      const redirect = new Redirect(
        this.createRedirectForm.get('target')?.value ?? '',
        Number.parseInt(this.createRedirectForm.get('delay')?.value) ?? -1,
        Timestamp.fromDate(
          new Date(
            this.createRedirectForm.get('expiresAt')?.value ?? '1970-01-01'
          )
        ),
        this.createRedirectForm.get('message')?.value ?? null,
        new Metadata(Timestamp.now())
      );

      const id = this.createRedirectForm.get('id')?.value;
      try {
        this.loading = true;
        await setDoc(
          doc(this.firestore, `redirects/${id}`).withConverter(
            redirectConverter
          ),
          redirect
        );

        this.clipboard.copy(`https://smol.bar/r/${id}`);
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
}
