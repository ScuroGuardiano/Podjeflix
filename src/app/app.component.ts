import { Component, OnInit } from '@angular/core';
import { CDAService } from './services/cda.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'podjeflix';
  cdaSrc: string;
  cdaVideoInfo = '';

  constructor(private cdaService: CDAService) {}

  async extract() {
    const cdaVideoInfo = await this.cdaService.getVideoInfo(this.cdaSrc);
    this.cdaVideoInfo = JSON.stringify(cdaVideoInfo, null, 4);
  }

  ngOnInit(): void {
  }
}
