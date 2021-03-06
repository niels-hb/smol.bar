import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from '@angular/fire/firestore';
import { Metadata } from './metadata';

export class Redirect {
  readonly target: string;

  readonly delay: number;

  readonly expiresAt: Timestamp;

  readonly message: string | null;

  readonly metadata: Metadata;

  constructor(
    target: string,
    delay: number,
    expiresAt: Timestamp,
    message: string,
    metadata: Metadata
  ) {
    this.target = target;
    this.delay = delay;
    this.expiresAt = expiresAt;
    this.message = message;
    this.metadata = metadata;
  }

  static fromJSON(data: DocumentData): Redirect {
    if (!data) {
      throw new Error('Redirect.fromJSON() failed because of missing data!');
    }

    return new Redirect(
      data['target'],
      data['delay'],
      data['expiresAt'],
      data['message'],
      Metadata.fromJSON(data['metadata'])
    );
  }

  toJSON() {
    return {
      target: this.target,
      delay: this.delay,
      expiresAt: this.expiresAt,
      message: this.message,
      metadata: this.metadata.toJSON(),
    };
  }
}

export const redirectConverter = {
  toFirestore: (redirect: Redirect) => {
    return redirect.toJSON();
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<DocumentData>,
    _options: SnapshotOptions | undefined
  ): Redirect => {
    return Redirect.fromJSON(snapshot.data());
  },
};
