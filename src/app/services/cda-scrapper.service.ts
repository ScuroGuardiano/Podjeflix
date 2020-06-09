import { Injectable } from '@angular/core';
import { WebviewTag } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class CdaScrapperService {

  private webview: WebviewTag;

  constructor() { }
  setWebview(webview: WebviewTag) {
    this.webview = webview;
  }
  async getQualitiesForUrl(url: string) {
    return [
      360,
      480,
      720
    ];
  }
  async getDirectVideoUrlForQuality(url, quality) {
    this.webview.src = `${url}?wersja=${quality}p`;
  }
}
