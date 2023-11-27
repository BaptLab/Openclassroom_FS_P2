import { Component, Input, OnInit } from '@angular/core';
import { HeaderStatModel } from 'src/app/core/models/HeaderStatModel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() data: Array<HeaderStatModel> = [];
  @Input() headerTitleToDisplay: string = '';

  public stats: Array<HeaderStatModel> = [];

  constructor() {}

  ngOnInit(): void {
    this.stats = this.data;
  }
}
