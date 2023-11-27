import { Component, OnInit, OnDestroy } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympicService/olympic.service';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { catchError } from 'rxjs/operators';
import { EMPTY, Subscription } from 'rxjs';
import { HeaderStatModel } from 'src/app/core/models/HeaderStatModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  //Variables passed into the html template
  public headerTitle = 'Medals per Country';
  public dataFormattedForHeader: Array<HeaderStatModel> = [];
  public dataInput: OlympicCountry[] = [];

  private olympicsSubscription: Subscription | undefined;

  constructor(private olympicService: OlympicService) {}

  //Fetching data observable
  public olympics$ = this.olympicService.getOlympics().pipe(
    catchError((error) => {
      console.error('Error fetching Olympic data:', error);
      return EMPTY;
    })
  );

  //Data formatting for header and passed in the template
  formatDataForHeader(
    dataToFormat: Array<OlympicCountry>
  ): Array<HeaderStatModel> {
    if (dataToFormat.length > 0) {
      this.dataFormattedForHeader.push(
        new HeaderStatModel('Number of JOs', dataToFormat.length),
        new HeaderStatModel('Number of countries', dataToFormat.length)
      );
    }
    return this.dataFormattedForHeader;
  }

  //On creation, we subscribe to get data and we format the data for the header, both are passed in the html template
  ngOnInit(): void {
    this.olympicsSubscription = this.olympics$.subscribe((data) => {
      if (Array.isArray(data)) {
        this.dataInput = data;
        this.formatDataForHeader(this.dataInput);
      }
    });
  }

  //Unsubscribe when component destroyed to avoid memory leaks
  ngOnDestroy(): void {
    this.olympicsSubscription?.unsubscribe();
  }
}
