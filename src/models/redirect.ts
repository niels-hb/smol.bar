import {
  DocumentData,
  DocumentReference,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from '@angular/fire/firestore';
import { Metadata } from './metadata';

export class Redirect {
  readonly target: string;
  readonly delay: number;
  readonly expiresAt: Timestamp;
  readonly metadata: Metadata;

  constructor(
    target: string,
    delay: number,
    expiresAt: Timestamp,
    metadata: Metadata
  ) {
    this.target = target;
    this.delay = delay;
    this.expiresAt = expiresAt;
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
      Metadata.fromJSON(data['metadata'])
    );
  }

  toJSON() {
    return {
      target: this.target,
      delay: this.delay,
      expiresAt: this.expiresAt,
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
    _: SnapshotOptions | undefined
  ): Redirect => {
    return Redirect.fromJSON(snapshot.data());
  },
};
