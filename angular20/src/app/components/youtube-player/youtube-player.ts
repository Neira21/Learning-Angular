import { Component, inject } from '@angular/core';

import { YouTubePlayer } from '@angular/youtube-player';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-youtube-player',
  imports: [YouTubePlayer],
  templateUrl: './youtube-player.html',
  styleUrl: './youtube-player.css',
})
export class YoutubePlayer {
  apiYoutube = inject(YoutubeService);

  listVideos: any[] = [];

  constructor() {
    this.apiYoutube.getListVideos().subscribe((data: any) => {
      this.listVideos = data.items;
      console.log(this.listVideos);
    });
  }
}
