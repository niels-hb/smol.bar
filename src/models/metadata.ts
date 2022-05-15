import { DocumentData, Timestamp } from '@angular/fire/firestore';

export class Metadata {
  readonly createdAt: Timestamp;

  readonly createdBy: string;

  readonly updatedAt: Timestamp;

  readonly updatedBy: string;

  constructor(
    createdAt: Timestamp,
    createdBy: string,
    updatedAt: Timestamp,
    updatedBy: string
  ) {
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.updatedAt = updatedAt;
    this.updatedBy = updatedBy;
  }

  static fromJSON(data: DocumentData): Metadata {
    if (!data) {
      throw new Error('Metadata.fromJSON() failed because of missing data!');
    }

    return new Metadata(
      data['createdAt'],
      data['createdBy'],
      data['updatedAt'],
      data['updatedBy']
    );
  }

  toJSON() {
    return {
      createdAt: this.createdAt,
      createdBy: this.createdBy,
      updatedAt: this.updatedAt,
      updatedBy: this.updatedBy,
    };
  }
}
