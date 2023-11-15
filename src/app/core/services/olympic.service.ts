import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { OlympicCountry } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';

  private olympics$ = new BehaviorSubject<OlympicCountry | null>(null);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<OlympicCountry>(this.olympicUrl).pipe(
      tap((value) => {
        console.log('Fetched Olympic Data:', value);
        this.olympics$.next(value);
      }),
      catchError((error, caught) => {
        console.error(error);
        this.olympics$.next(null);

        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }
}
