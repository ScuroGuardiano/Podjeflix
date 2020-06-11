import { Component, OnInit } from '@angular/core';
import { CDAService } from './services/cda.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  query = '';
  searchQuery: string;

  constructor(private cdaService: CDAService) {}

  ngOnInit(): void {
  }
  search() {
    this.searchQuery = this.query;
  }
}
