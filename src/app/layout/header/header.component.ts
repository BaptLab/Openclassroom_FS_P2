import { Component, Input, OnInit } from '@angular/core';
import { OlympicCountry } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() data: OlympicCountry[] = [];

  public headerTitle = '';
  public numberOfEntries = 0;
  public numberOfMedals = 0;
  public numberofAthletes = 0;

  constructor() {}

  ngOnInit(): void {}
}
