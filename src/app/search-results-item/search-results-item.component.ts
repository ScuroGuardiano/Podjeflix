import { Component, OnInit, Input } from '@angular/core';
import { ICDASearchVideoInfo } from '../utils/cda-utils';

@Component({
  selector: 'app-search-results-item',
  templateUrl: './search-results-item.component.html',
  styleUrls: ['./search-results-item.component.scss']
})
export class SearchResultsItemComponent implements OnInit {
  @Input() video: ICDASearchVideoInfo;

  constructor() { }

  ngOnInit(): void {
  }
  getThumb(width: number, height: number) {
    const splitted = this.video.thumbUrl.split('_');
    splitted[splitted.length - 1] = `${width}x${height}.jpg`;
    return splitted.join('_');
  }
  getDescription() {
    return this.video.description.replace(new RegExp('<br />', 'g'), '');
  }
}
