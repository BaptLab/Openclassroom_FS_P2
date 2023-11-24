// Import necessary components and modules from Angular and Chart.js
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables, ChartOptions } from 'chart.js'; // Import ChartOptions
import { OlympicCountry, Participation } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  // Input property to receive data from the parent component
  @Input() data: OlympicCountry[] = [];

  // Arrays to store country names and participation data separately
  private countryData: string[] = [];
  private participationData: number[] = [];

  // Variable to store the Chart.js instance
  public pieChart: Chart<'pie', number[], string> | null = null;

  // Constructor method, registering Chart.js plugins
  constructor(private router: Router) {
    Chart.register(...registerables);
  }

  // Lifecycle hook called after the component is initialized
  ngOnInit(): void {
    // Check if input data is available and not empty
    if (this.data && this.data.length) {
      // Extract country names from the data
      this.countryData = this.data.map((country) => country.country);

      // Extract participation data from the data
      this.participationData = this.data.map((country) =>
        country.participations.reduce(
          (totalMedals, participation) =>
            totalMedals + participation.medalsCount,
          0
        )
      );

      // Check if both countryData and participationData have valid lengths
      if (this.countryData.length && this.participationData.length > 0) {
        // Call the method to set up and display the pie chart
        this.setUpPieChart();
      }
    }
  }

  // Method to set up the Chart.js pie chart
  private setUpPieChart() {
    // Create a new Chart.js instance with specified options
    this.pieChart = new Chart<'pie', number[], string>('pie-canvas', {
      // Set the chart type to 'pie'
      type: 'pie',
      // Provide data for the chart, including labels and datasets
      data: {
        labels: this.countryData, // Labels for each segment of the pie chart
        datasets: [
          {
            data: this.participationData,
          },
        ],
      },
      // Specify additional chart options
      options: {
        onClick: (e, chartElements) => {
          const countryClicked = this.countryData[chartElements[0].index];
          this.router.navigateByUrl('details/' + countryClicked);
        },
        animation: false, // Disable animation
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
}
