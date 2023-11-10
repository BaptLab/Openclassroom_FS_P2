import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public numberOfEntries: number;
  public numberOfAthletes: number;
  public numberOfMedals: number;

  constructor() {
    this.numberOfEntries = 15;
    this.numberOfMedals = 40;
    this.numberOfAthletes = 109;
  }

  ngOnInit(): void {}
}
