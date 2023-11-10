import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.setUpPieChart();
  }

  /*   const pieCanvas = document.getElementById(
    'pie-canvas'
  ) as HTMLCanvasElement; */

  public pieChart: any;

  private setUpPieChart() {
    this.pieChart = new Chart('pie-canvas', {
      type: 'pie',
      data: {
        labels: ['Italy', 'Spain', 'USA', 'Germany', 'France'],
        datasets: [
          {
            data: [28, 20, 109, 44, 35],
          },
        ],
      },
      options: {},
    });
  }
}
