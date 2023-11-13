import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, tap, catchError } from 'rxjs';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public countryName: string = '';
  public numberOfEntries: number = 0;
  public numberOfMedals: number = 0;
  public numberofAthletes: number = 0;

  public participationData: Array<any> = [];
  public olympics$: Observable<any> = of(null);

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.countryName = this.route.snapshot.params['country'];
    this.olympics$ = this.olympicService.getOlympics().pipe(
      catchError((error) => {
        console.error('Error fetching Olympic data:', error);
        return of(null); // Return an empty observable or handle the error as appropriate
      }),
      tap((formattedData) => {
        if (formattedData) {
          this.participationData = this.extractParticipationData(formattedData);
          const { numberOfEntries, numberOfMedals, numberofAthletes } =
            this.calculateStatistics(this.participationData);
          console.log(this.participationData);

          // Use the values directly within this block
          this.numberOfEntries = numberOfEntries;
          this.numberOfMedals = numberOfMedals;
          this.numberofAthletes = numberofAthletes;
        }
      })
    );
  }

  private extractParticipationData(data: any) {
    // Check if the 'country' input is provided and not an empty string
    if (this.countryName && this.countryName.trim() !== '') {
      // Filter data based on the 'country' input value
      const selectedCountry = data.find(
        (item: any) => item.country === this.countryName
      );

      // Check if the selected country is found
      if (selectedCountry) {
        return selectedCountry.participations;
      } else {
        console.warn(`Country '${this.countryName}' not found in the data.`);
        this.participationData = [];
      }
    } else {
      console.warn('Country input is not provided or is an empty string.');
      this.participationData = [];
    }
  }

  private calculateStatistics(data: any) {
    const numberOfEntries = data.length;
    console.log(data);
    const numberOfMedals = data.reduce(
      (totalMedals: any, participation: any) =>
        totalMedals + participation.medalsCount,
      0
    );
    const numberofAthletes = data.reduce(
      (totalAthletes: any, participation: any) =>
        totalAthletes + participation.athleteCount,
      0
    );
    return { numberOfEntries, numberOfMedals, numberofAthletes };
  }
}
