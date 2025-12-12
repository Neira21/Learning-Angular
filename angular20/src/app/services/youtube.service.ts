import { environment } from './../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private apikey: string = environment.apiKey;
  http = inject(HttpClient);

  getListVideos() {
    return this.http.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=7&regionCode=US&key=${this.apikey}`,
    );
  }

  getVideosByPart(part: string) {
    return this.http.get(
      `https://www.googleapis.com/youtube/v3/videos?part=${part}&chart=mostPopular&maxResults=25&regionCode=US&key=${this.apikey}`,
    );
  }

  getVideosByChannel(channelId: string) {
    return this.http.get(
      `https://www.googleapis.com/youtube/v3/search?channelId=${channelId}&part=snippet,id&order=date&maxResults=20&key=${this.apikey}`,
    );
  }
}
