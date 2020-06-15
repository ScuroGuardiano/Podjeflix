import { Component, OnInit } from '@angular/core';
import { CDAService } from './services/cda.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
  }
}
