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

export interface ICDASearchVideoInfo {
  title: string;
  url: string;
  description: string;
  duration: string;
  highestQuality: string;
  thumbUrl: string;
  isPremium: boolean;
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
    thumbUrl: playerData.video.thumb,
  };
}

export async function cda_Search(query: string, ignorePremium = true): Promise<ICDASearchVideoInfo[]> {
  const searchUrl = `https://www.cda.pl/info/${query.replace(' ', '_').toLowerCase()}`;
  const cdaDocument = await getCDAHTMLDoc(searchUrl);

  const videos: ICDASearchVideoInfo[] = [];

  cdaDocument.querySelectorAll('.video-clip-wrapper')
    .forEach(searchElement => {
      const linkTitleVisit = searchElement.querySelector('.link-title-visit');
      const title = linkTitleVisit?.textContent;
      const url = `https://www.cda.pl${linkTitleVisit.getAttribute('href')}`;
      const description = searchElement.querySelector('label')?.getAttribute('title');
      const duration = searchElement.querySelector('.timeElem')?.textContent;
      const highestQuality = searchElement.querySelector('.hd-ico-elem')?.textContent;
      const thumbUrl = searchElement.querySelector('img')?.src;
      const isPremium = !!searchElement.querySelector('.flag-video-premium');

      if (isPremium && ignorePremium) {
        return;
      }
      videos.push({ title, url, description, duration, highestQuality, thumbUrl, isPremium });
    });

  return videos;
}

async function getCDAHTMLDoc(url: string): Promise<Document> {
  const res = await fetch(url, {
    mode: 'no-cors'
  });

  console.log(`Request for ${url} status: ${res.status}`);

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
