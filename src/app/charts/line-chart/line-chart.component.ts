import { Component, OnInit, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  @Input() data: Array<OlympicCountry> = [];
  @Input() country: string = '';

  private participationData: Array<any> = [];

  private numberOfEntries: number = 0;
  private numberOfMedals: number = 0;
  private numberofAthletes: number = 0;

  public lineChart: any;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    if (this.data && this.data.length) {
      this.extractParticipationData();
      if (this.participationData.length > 0) {
        this.calculateStatistics();
        this.setUpLineChart();
        console.log(this.participationData);
      }
    }
  }

  /* Calculation for medal count */
  /* this.participationData.map(
    (participations: Participation[]) =>
      participations.reduce(
        (totalMedals: number, participation: Participation) =>
          totalMedals + participation.medalsCount,
        0
      )
  ); */

  private extractParticipationData() {
    // Check if the 'country' input is provided and not an empty string
    if (this.country && this.country.trim() !== '') {
      // Filter data based on the 'country' input value
      const selectedCountry = this.data.find(
        (item) => item.country === this.country
      );

      // Check if the selected country is found
      if (selectedCountry) {
        this.participationData = selectedCountry.participations;
      } else {
        console.warn(`Country '${this.country}' not found in the data.`);
        this.participationData = [];
      }
    } else {
      console.warn('Country input is not provided or is an empty string.');
      this.participationData = [];
    }
  }

  private calculateStatistics() {
    this.numberOfEntries = this.participationData.length;
    this.numberOfMedals = this.participationData.reduce(
      (totalMedals, participation) => totalMedals + participation.medalsCount,
      0
    );
    this.numberofAthletes = this.participationData.reduce(
      (totalAthletes, participation) =>
        totalAthletes + participation.athleteCount,
      0
    );
  }

  private setUpLineChart() {
    this.lineChart = new Chart('line-chart-canvas', {
      type: 'line',
      data: {
        labels: this.participationData.map(
          (participation) => participation.year
        ),
        datasets: [
          {
            data: this.participationData.map(
              (participation) => participation.medalsCount
            ),
          },
        ],
      },
      options: {
        scales: {
          y: {
            suggestedMax: 80,
          },
        },
      },
    });
  }
}
