import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {
  OlympicCountry,
  Participation,
  Statistics,
} from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  public countryName = '';
  public numberOfEntries = 0;
  public numberOfMedals = 0;
  public numberofAthletes = 0;

  public participationData: Participation[] = [];
  public olympics$: Observable<OlympicCountry[]> = of([]);

  private olympicsSubscription: Subscription | undefined;

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.countryName = this.route.snapshot.params['country'];
    this.olympicsSubscription = this.olympicService
      .getOlympics()
      .pipe(
        catchError((error) => {
          console.error('Error fetching Olympic data:', error);
          return of(null);
        }),
        tap((formattedData) => {
          if (formattedData) {
            const dataArray = Array.isArray(formattedData)
              ? formattedData
              : [formattedData];
            const selectedCountry = this.extractParticipationData(
              dataArray,
              this.countryName
            );

            if (selectedCountry) {
              this.participationData = selectedCountry.participations || [];
              const { numberOfEntries, numberOfMedals, numberofAthletes } =
                this.calculateStatistics(this.participationData);

              this.numberOfEntries = numberOfEntries;
              this.numberOfMedals = numberOfMedals;
              this.numberofAthletes = numberofAthletes;
            } else {
              console.warn(
                `Country '${this.countryName}' not found in the data.`
              );
              this.router.navigateByUrl('/not-found');
            }
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.olympicsSubscription?.unsubscribe();
  }

  private extractParticipationData(
    data: OlympicCountry[],
    countryName: string
  ): OlympicCountry | null {
    if (countryName && countryName.trim() !== '') {
      return data.find((item) => item.country === countryName) || null;
    } else {
      console.warn('Country input is not provided or is an empty string.');
      return null;
    }
  }

  navigateToHomepage(): void {
    this.router.navigateByUrl('');
  }

  private calculateStatistics(data: Participation[]): Statistics {
    const numberOfEntries = data.length;
    const numberOfMedals = data.reduce(
      (totalMedals, participation) => totalMedals + participation.medalsCount,
      0
    );
    const numberofAthletes = data.reduce(
      (totalAthletes, participation) =>
        totalAthletes + participation.athleteCount,
      0
    );
    return { numberOfEntries, numberOfMedals, numberofAthletes };
  }
}
