import { Component, OnInit } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // Observable to hold Olympic data, initialized with an observable of an empty array
  public olympics$ = this.olympicService.getOlympics();
  public dataInput: OlympicCountry[] = [];

  // Inject OlympicService into the constructor
  constructor(private olympicService: OlympicService) {}

  // Lifecycle hook called after the component is initialized
  ngOnInit(): void {
    // Subscribe to the Olympic data observable from the service
    this.olympics$.subscribe((data) => {
      // Check if data is an array before assigning it
      if (Array.isArray(data)) {
        this.dataInput = data;
      }
    });
  }
}
