import { Component, OnInit, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { OlympicCountry, Participation } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  @Input() chartData: Array<Participation> = [];
  @Input() country: string = '';

  public lineChart: Chart | null = null;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.setUpLineChart();
  }

  private setUpLineChart(): void {
    this.lineChart = new Chart('line-chart-canvas', {
      type: 'line',
      data: {
        labels: this.chartData.map((participation) => participation.year),
        datasets: [
          {
            label: 'Médaille(s) par participation',
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
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
}
