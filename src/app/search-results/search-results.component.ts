import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CDAService } from '../services/cda.service';
import { ICDASearchVideoInfo } from '../utils/cda-utils';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnChanges {
  @Input() query: string;
  searchResults: ICDASearchVideoInfo[] = [];
  loading = false;

  constructor(private cdaService: CDAService) { }

  ngOnInit(): void {
  }
  async ngOnChanges(changes: SimpleChanges) {
    if (changes.query && changes.query.currentValue) {
      this.loading = true;
      const searchResults = await this.cdaService.searchVideos(changes.query.currentValue);
      this.loading = false;
      this.searchResults.splice(0, this.searchResults.length, ...searchResults);
    }
  }
}
