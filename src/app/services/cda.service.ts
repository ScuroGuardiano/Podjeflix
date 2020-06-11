import { Injectable } from '@angular/core';
import { ICDAVideoInfo, cda_GetVideoInfo, ICDASearchVideoInfo, cda_Search } from '../utils/cda-utils';

@Injectable({
  providedIn: 'root'
})
export class CDAService {
  constructor() { }

  async getVideoInfo(url: string): Promise<ICDAVideoInfo> {
    return cda_GetVideoInfo(url);
  }
  async searchVideos(query: string, ignorePremium = true): Promise<ICDASearchVideoInfo[]> {
    return cda_Search(query, ignorePremium);
  }
}
