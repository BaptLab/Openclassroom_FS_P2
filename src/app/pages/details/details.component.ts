import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HeaderStatModel } from 'src/app/core/models/HeaderStatModel';

import {
  OlympicCountry,
  Participation,
  Statistics,
} from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympicService/olympic.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  //Variables passed into the html template
  public headerTitle: string = '';
  public dataFormattedForHeader: Array<HeaderStatModel> = [];
  public countryName: string = '';
  public participationData: Participation[] = [];

  //Placeholders Variables
  private numberOfEntries: number = 0;
  private numberOfMedals: number = 0;
  private numberofAthletes: number = 0;

  private olympicsSubscription: Subscription | undefined;

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  //Method to extract the data used in the line-chart component
  //returned data passed in the template as "participationData"
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

  //For "back" btn in the template
  navigateToHomepage(): void {
    this.router.navigateByUrl('');
  }

  //Method to calculate the stats displayed in the header
  //data returned are used in the formatDataForHeader()
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

  //Data formatting for header and passed in the template
  formatDataForHeader(
    numberOfEntries: number,
    numberOfMedals: number,
    numberofAthletes: number
  ): Array<HeaderStatModel> {
    this.dataFormattedForHeader.push(
      new HeaderStatModel('Number of entries', numberOfEntries),
      new HeaderStatModel('Total number medals', numberOfMedals),
      new HeaderStatModel('Total number of athletes', numberofAthletes)
    );
    return this.dataFormattedForHeader;
  }

  ngOnInit(): void {
    //First we get the country name from the URL parameter
    this.countryName = this.route.snapshot.params['country'];
    //and update the headerTitle accordingly
    this.headerTitle = this.countryName;

    //we fetch data
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
            //if the data is correct, we extract the data related to participation according to the country in the params
            const selectedCountry = this.extractParticipationData(
              dataArray,
              this.countryName
            );

            if (selectedCountry) {
              this.participationData = selectedCountry.participations || [];

              //we then update the statistics values
              const { numberOfEntries, numberOfMedals, numberofAthletes } =
                this.calculateStatistics(this.participationData);

              this.numberOfEntries = numberOfEntries;
              this.numberOfMedals = numberOfMedals;
              this.numberofAthletes = numberofAthletes;

              //we passed the updated values as argument for the header formatting
              this.formatDataForHeader(
                this.numberOfEntries,
                this.numberOfMedals,
                this.numberofAthletes
              );
            } else {
              console.warn(
                `Country '${this.countryName}' not found in the data.`
              );
              //if there is no data, redirection to error page
              this.router.navigateByUrl('/not-found');
            }
          }
        })
      )
      .subscribe();
  }

  //Unsubscribe when component destroyed to avoid memory leaks
  ngOnDestroy(): void {
    this.olympicsSubscription?.unsubscribe();
  }
}
