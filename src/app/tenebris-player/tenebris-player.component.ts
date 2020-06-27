import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-tenebris-player',
  templateUrl: './tenebris-player.component.html',
  styleUrls: ['./tenebris-player.component.scss']
})
export class TenebrisPlayerComponent implements OnInit, AfterViewInit {
  @ViewChild('videoEl') private videoRef: ElementRef<HTMLVideoElement>;
  @ViewChild('videoWrapperEl') private videoWrapper: ElementRef<HTMLDivElement>;
  video: HTMLVideoElement;
  currentTime = '00:00';
  duration = '00:00';
  fullscreened = false;
  playPauseIcon = 'play_arrow';
  volume = 100;
  volumeBarValue = 100;
  muted = false;
  progress = 0;

  hideControlsTimeout: any;
  controlsVisibility = true;

  title = 'Nice Cock';

  private videoClickTimeout: any;

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.video = this.videoRef.nativeElement;
    this.video.addEventListener('loadedmetadata', () => {
      this.duration = this.formatTime(this.video.duration);
    });

    this.startControlsHide();
  }

  playPauseClick() {
    if (this.video.paused) {
      if (this.video.ended) {
        this.video.currentTime = 0;
      }
      this.video.play();
      this.playPauseIcon = 'pause';
    }
    else {
      this.video.pause();
      this.playPauseIcon = 'play_arrow';
    }
  }
  onVideoClick() {
    if (this.videoClickTimeout) {
      clearTimeout(this.videoClickTimeout);
      this.videoClickTimeout = null;
    }
    else {
      this.videoClickTimeout = setTimeout(() => {
        this.playPauseClick();
        this.videoClickTimeout = null;
      }, 200);
    }
  }
  goBack(seconds: number) {
    this.video.currentTime =
      Math.max(this.video.currentTime - seconds, 0);
  }
  goForward(seconds: number) {
    this.video.currentTime =
      Math.min(this.video.currentTime + seconds, this.video.duration);
  }

  onEnd() {
    this.video.pause();
    this.playPauseIcon = 'replay';
  }
  onTimeUpdate() {
    this.currentTime = this.formatTime(this.video.currentTime);
    this.progress = this.video.currentTime / this.video.duration;
  }
  toogleFullscreen() {
    if (this.fullscreened) {
      document.exitFullscreen();
      this.fullscreened = false;
    }
    else {
      this.videoWrapper.nativeElement.requestFullscreen();
      this.fullscreened = true;
    }
  }
  toogleMute() {
    if (this.muted) {
      this.muted = false;
      this.volumeBarValue = this.volume;
      this.video.volume = this.volume / 100;
    }
    else {
      this.muted = true;
      this.volumeBarValue = 0;
      this.video.volume = 0;
    }
  }
  volumeChange() {
    if (this.muted) {
      this.muted = false;
    }
    this.volume = this.volumeBarValue;
    this.video.volume = this.volume / 100;
  }
  progressBarClick(event: MouseEvent) {
    this.video.currentTime =
      (event.offsetX / (event.target as HTMLProgressElement).clientWidth)
      * this.video.duration;
  }
  startControlsHide() {
    if (this.hideControlsTimeout) {
      clearTimeout(this.hideControlsTimeout);
    }
    this.hideControlsTimeout = setTimeout(() => {
      this.controlsVisibility = false;
      this.hideControlsTimeout = null;
    }, 2000);
  }
  stopControlsHide() {
    if (this.hideControlsTimeout) {
      clearTimeout(this.hideControlsTimeout);
    }
  }
  showControls() {
    this.controlsVisibility = true;
    this.startControlsHide();
  }

  private formatTime(time: number): string {
    let minutes = Math.floor(time / 60).toString();
    let seconds = (Math.floor(time) % 60).toString();
    if (minutes.length === 1) {
      minutes = '0' + minutes;
    }
    if (seconds.length === 1) {
      seconds = '0' + seconds;
    }

    return `${minutes}:${seconds}`;
  }

}
