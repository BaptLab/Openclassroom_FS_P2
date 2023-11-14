import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // Observable to hold Olympic data, initialized with an observable of null
  public olympics$: Observable<any> = of(null);

  // Inject OlympicService into the constructor
  constructor(private olympicService: OlympicService) {}

  // Lifecycle hook called after the component is initialized
  ngOnInit(): void {
    // Subscribe to the Olympic data observable from the service
    this.olympics$ = this.olympicService.getOlympics();
  }
}
