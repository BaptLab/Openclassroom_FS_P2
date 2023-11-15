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
  public olympics$ = this.olympicService.getOlympics().pipe(
    catchError((error) => {
      console.error('Error fetching Olympic data:', error);
      return EMPTY;
    })
  );

  public dataInput: OlympicCountry[] = [];

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$.subscribe((data) => {
      if (Array.isArray(data)) {
        this.dataInput = data;
      }
    });
  }
}
