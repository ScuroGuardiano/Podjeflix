import { Injectable } from '@angular/core';
import { ICDAVideoInfo, cda_GetVideoInfo } from '../utils/cda-utils';

@Injectable({
  providedIn: 'root'
})
export class CDAService {
  constructor() { }

  async getVideoInfo(url: string): Promise<ICDAVideoInfo> {
    return cda_GetVideoInfo(url);
  }
}
