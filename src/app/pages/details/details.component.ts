import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  /* public numberOfEntries: number;
  public numberOfAthletes: number;
  public numberOfMedals: number; */
  public countryName: string = '';

  public olympics$: Observable<any> = of(null);

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.countryName = this.route.snapshot.params['country'];
    this.olympics$ = this.olympicService.getOlympics();
    console.log(this.olympics$);
    /* this.numberOfEntries = 15;
    this.numberOfMedals = 40;
    this.numberOfAthletes = 109; */
  }
}
