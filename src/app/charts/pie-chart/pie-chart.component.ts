// Import necessary components and modules from Angular and Chart.js
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';

// Define the Angular component with its selector, template, and styles
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  // Input property to receive data from the parent component
  @Input() data: Array<OlympicCountry> = [];

  // Arrays to store country names and participation data separately
  private countryData: Array<any> = [];
  private participationData: Array<any> = [];

  // Variable to store the Chart.js instance
  public pieChart: any;

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
      this.participationData = this.data.map(
        (country) => country.participations
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
    this.pieChart = new Chart('pie-canvas', {
      // Set the chart type to 'pie'
      type: 'pie',
      // Provide data for the chart, including labels and datasets
      data: {
        labels: this.countryData, // Labels for each segment of the pie chart
        datasets: [
          {
            data: this.participationData.map(
              // Map and reduce participation data to get total medals for each country
              (participations: Participation[]) =>
                participations.reduce(
                  (totalMedals: number, participation: Participation) =>
                    totalMedals + participation.medalsCount,
                  0
                )
            ),
          },
        ],
      },
      // Specify additional chart options (currently empty in this example)
      options: {
        onClick: (e, chartElements) => {
          const countryClicked = this.countryData[chartElements[0].index];
          this.router.navigateByUrl('details/' + countryClicked);
        },
      },
    });
  }
}
