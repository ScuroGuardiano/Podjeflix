import { VideoViewComponent } from '../video-view/video-view.component';

export interface IVideoSetting {
  settingText: string;
  settingCallback: (videoView: VideoViewComponent) => void;
}
