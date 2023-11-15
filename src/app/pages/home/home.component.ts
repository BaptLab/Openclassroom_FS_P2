import { Component, OnInit } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // Observable to hold Olympic data, initialized with an observable of an empty array
  public olympics$ = this.olympicService.getOlympics().pipe(
    catchError((error) => {
      // Handle the error here, you can log it or show a user-friendly message
      console.error('Error fetching Olympic data:', error);
      // Return an empty observable to keep the stream alive
      return EMPTY;
    })
  );

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
