import { Component, OnInit } from '@angular/core';
import {
  DocumentSnapshot,
  Firestore,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { Observable, finalize, from, interval, map, take, tap } from 'rxjs';
import { Redirect, redirectConverter } from 'src/models/redirect';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forwarder',
  templateUrl: './forwarder.component.html',
  styleUrls: ['./forwarder.component.css'],
})
export class ForwarderComponent implements OnInit {
  redirectData$: Observable<DocumentSnapshot<Redirect>> | undefined;

  timeRemaining: number | undefined;

  constructor(private route: ActivatedRoute, private firestore: Firestore) {}

  ngOnInit(): void {
    const redirectId = this.route.snapshot.params['id'];
    this.redirectData$ = this.loadRedirectData(redirectId);
  }

  redirect(url: string) {
    window.location.href = url;
  }

  private loadRedirectData(
    redirectId: string
  ): Observable<DocumentSnapshot<Redirect>> {
    return from(
      getDoc(
        doc(this.firestore, `redirects/${redirectId}`).withConverter(
          redirectConverter
        )
      )
    ).pipe(
      tap((snapshot) => {
        if (snapshot.exists()) {
          this.startTimer(snapshot.data()!.delay, () =>
            this.redirect(snapshot.data()!.target)
          );
        }
      })
    );
  }

  private startTimer(duration: number, callback: () => void) {
    const time = duration;
    interval(1000)
      .pipe(
        take(time),
        map((v) => time - v - 1),
        tap((v) => (this.timeRemaining = v)),
        finalize(() => callback())
      )
      .subscribe();
  }
}
