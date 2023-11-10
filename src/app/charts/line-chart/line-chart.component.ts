import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.setUpLineChart();
  }

  public lineChart: any;

  private setUpLineChart() {
    this.lineChart = new Chart('line-chart-canvas', {
      type: 'line',
      data: {
        labels: ['2012', '2016', '2020'],
        datasets: [
          {
            data: [20, 34, 19],
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
