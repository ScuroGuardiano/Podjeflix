/*
  Yea, I know, I could've done it all in services/cda.service.ts
  But I wanted to make the possibility of taking this file out of this project
  and use it somewhere else. And I just started writing those functions so whatever.
*/

import decodeCDAVideoUrl from './cda-decoder';

export interface ICDAQuality {
  quality: string;
  url: string;
}

export interface ICDAVideoInfo {
  id: string;
  title: string;
  directVideoUrl: string;
  currentQuality: string;
  availableQualities: ICDAQuality[];
  thumbUrl: string;
}

export async function cda_GetVideoInfo(url: string): Promise<ICDAVideoInfo> {
  const qualityNames = {
    vl: '360p',
    lq: '480p',
    sd: '720p',
    hd: '1080p'
  };

  const cdaDocument = await getCDAHTMLDoc(url);

  const playerData = getPlayerData(cdaDocument);

  return {
    id: playerData.video.id,
    title: decodeURIComponent(playerData.video.title),
    directVideoUrl: decodeCDAVideoUrl(playerData.video.file),
    currentQuality: qualityNames[playerData.video.quality],
    availableQualities: getQualityList(cdaDocument),
    thumbUrl: playerData.video.thumb
  };
}

async function getCDAHTMLDoc(url: string): Promise<Document> {
  const res = await fetch(url, {
    mode: 'no-cors'
  });

  if (res.status === 200) {
    const body = await res.text();
    const domParser = new DOMParser();
    return domParser.parseFromString(body, 'text/html');
  }
  else {
    throw new Error(`Some shit happened, statusCode: ${res.status}\n body: ${res.body}`);
  }
}

function getQualityList(cdaDocument: Document): ICDAQuality[] {
  const qualities: ICDAQuality[] = [];

  cdaDocument.querySelectorAll('a.quality-btn')
  .forEach((qualityBtn: HTMLAnchorElement) => {
    const url = new URL(qualityBtn.href);
    url.host = 'www.cda.pl';
    url.port = '';
    qualities.push({
      quality: qualityBtn.textContent,
      url: url.href
    });
  });

  return qualities;
}

function getPlayerData(cdaDocument: Document): any {
  const playerDataEl = cdaDocument.querySelector(`[id^='mediaplayer']`);
  return JSON.parse(playerDataEl.getAttribute('player_data'));
}