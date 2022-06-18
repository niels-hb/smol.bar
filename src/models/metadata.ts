import { DocumentData, Timestamp } from '@angular/fire/firestore';

export class Metadata {
  readonly createdAt: Timestamp;

  constructor(createdAt: Timestamp) {
    this.createdAt = createdAt;
  }

  static fromJSON(data: DocumentData): Metadata {
    if (!data) {
      throw new Error('Metadata.fromJSON() failed because of missing data!');
    }

    return new Metadata(data['createdAt']);
  }

  toJSON() {
    return {
      createdAt: this.createdAt,
    };
  }
}
