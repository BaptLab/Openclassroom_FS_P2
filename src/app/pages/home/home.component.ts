import { Component, OnInit, OnDestroy } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { catchError } from 'rxjs/operators';
import { EMPTY, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private olympicsSubscription: Subscription | undefined;

  public olympics$ = this.olympicService.getOlympics().pipe(
    catchError((error) => {
      console.error('Error fetching Olympic data:', error);
      return EMPTY;
    })
  );

  public dataInput: OlympicCountry[] = [];

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicsSubscription = this.olympics$.subscribe((data) => {
      if (Array.isArray(data)) {
        this.dataInput = data;
      }
    });
  }

  ngOnDestroy(): void {
    this.olympicsSubscription?.unsubscribe();
  }
}
