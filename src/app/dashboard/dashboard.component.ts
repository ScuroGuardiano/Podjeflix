import { Component, OnInit } from '@angular/core';
import { CDAService } from '../services/cda.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  query = '';
  searchQuery: string;

  constructor(private cdaService: CDAService) { }

  ngOnInit(): void {
  }
  search() {
    this.searchQuery = this.query;
  }
}
