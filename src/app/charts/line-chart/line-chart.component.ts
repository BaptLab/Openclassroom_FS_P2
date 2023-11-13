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
  @Input() chartData: Array<Participation> = [];
  @Input() country: string = '';

  public lineChart: any;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.setUpLineChart();
    console.log('fetchedData : ', this.chartData);
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

  private setUpLineChart() {
    this.lineChart = new Chart('line-chart-canvas', {
      type: 'line',
      data: {
        labels: this.chartData.map((participation) => participation.year),
        datasets: [
          {
            data: this.chartData.map(
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
