import { Component, OnInit, OnDestroy } from '@angular/core';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { OlympicService } from './core/services/olympicService/olympic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private olympicsSubscription: Subscription | undefined;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicsSubscription = this.olympicService
      .loadInitialData()
      .pipe(take(1))
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.olympicsSubscription) {
      this.olympicsSubscription.unsubscribe();
    }
  }
}
