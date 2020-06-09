import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { WebviewTag } from 'electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'podjeflix';
  cdaSrc = 'https://www.cda.pl/video/417928397?wersja=720p';
  videoUrl: string;
  @ViewChild('webview') webview: ElementRef;
  webviewVisibility = false;

  ngOnInit(): void {
    document.addEventListener('keydown', e => {
      if (e.key === 'p') {
        this.webviewVisibility = !this.webviewVisibility;
      }
    });
  }
  ngAfterViewInit(): void {
    /*const webviewNative: WebviewTag = this.webview.nativeElement;
    webviewNative.addEventListener('dom-ready', async () => {
      const videoSrc = await webviewNative.executeJavaScript(`document.querySelector('video').src`);
      this.videoUrl = videoSrc;
    });*/
  }
}
