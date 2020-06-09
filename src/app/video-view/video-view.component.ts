import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.scss']
})
export class VideoViewComponent implements OnInit, AfterViewInit {

  constructor() { }

  @Input() src: string;
  @Input() title = 'Nice Cock';
  @ViewChild('videoEl') private videoRef: ElementRef<HTMLVideoElement>;
  @ViewChild('videoWrapperEl') private videoWrapperRef: ElementRef<HTMLDivElement>;
  video: HTMLVideoElement;
  ended = false;
  playPauseIcon = 'play_circle_outline';
  fullscreen = false;
  volumeBarVisibility = false;
  hideVolumeBarTimeout: any;
  volumePercentage = 100;

  playPause() {
    if (this.video.paused) {
      this.play();
    }
    else {
      this.pause();
    }
  }

  play() {
    this.video.play();
    this.ended = false;
    this.playPauseIcon = 'pause_circle_outline';
  }

  pause() {
    this.video.pause();
    this.playPauseIcon = 'play_circle_outline';
  }

  onEnd() {
    this.video.currentTime = 0;
    this.ended = true;
    this.playPauseIcon = 'replay';
  }

  goBack(seconds: number) {
    this.video.currentTime =
      Math.max(this.video.currentTime - seconds, 0);
  }
  goForward(seconds: number) {
    this.video.currentTime =
      Math.min(this.video.currentTime + seconds, this.video.duration);
  }
  toogleFullscreen() {
    if (this.fullscreen) {
      document.exitFullscreen();
      this.fullscreen = false;
    }
    else {
      this.videoWrapperRef.nativeElement.requestFullscreen();
      this.fullscreen = true;
    }
  }
  showVolumeBar(x: string) {
    console.log(x);
    clearTimeout(this.hideVolumeBarTimeout);
    this.volumeBarVisibility = true;
  }
  hideVolumeBar(x: string) {
    console.log(x);
    this.hideVolumeBarTimeout = setTimeout(
      () => this.volumeBarVisibility = false,
      100
    );
  }
  volumeChange() {
    this.video.volume = this.volumePercentage / 100;
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.video = this.videoRef.nativeElement;
  }
}
