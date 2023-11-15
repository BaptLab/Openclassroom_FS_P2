import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { OlympicCountry } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  // Define the URL for the Olympic data JSON file
  private olympicUrl = './assets/mock/olympic.json';

  // Create a BehaviorSubject to hold and broadcast the Olympic data
  private olympics$ = new BehaviorSubject<OlympicCountry | null>(null);

  // Inject the HttpClient service into the constructor
  constructor(private http: HttpClient) {}

  // Method to load initial data from the JSON file
  loadInitialData() {
    // Use the HttpClient to make a GET request to the specified URL
    return this.http.get<OlympicCountry>(this.olympicUrl).pipe(
      // Tap into the observable stream to update the BehaviorSubject with the received data
      tap((value) => {
        // Log the fetched data to the console
        console.log('Fetched Olympic Data:', value);
        this.olympics$.next(value);
      }),
      catchError((error, caught) => {
        // TODO: improve error handling (currently logs the error to the console)
        console.error(error);
        // Notify subscribers about the error by emitting a null value
        this.olympics$.next(null);

        // Continue the observable stream with the caught error
        return caught;
      })
    );
  }

  // Method to get the Olympic data as an observable
  getOlympics() {
    return this.olympics$.asObservable();
  }
}
