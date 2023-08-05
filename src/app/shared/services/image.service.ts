import { Injectable } from '@angular/core';
import { Size } from '../models/enums/tmdb/size';
import { TmdbConfigService } from './tmdb-config.service';
import { ISeasonResponseObject } from '../models/interfaces/response-objects/season';
import { IEpisodeResponseObject } from '../models/interfaces/response-objects/episode';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  imgBaseUrl = this.tmdbConfigService.getConfig().images.secure_base_url;
  posterSize = this.tmdbConfigService.getPoster(Size.XXL);
  profileSize = this.tmdbConfigService.getPoster(Size.MD);

  constructor(private tmdbConfigService:TmdbConfigService) { }

  setPosterPath(path: string): string {
    return path ? `${this.imgBaseUrl}${this.posterSize}/${path}` : "assets/images/poster_placeholder.png"
  }

  setProfilePath(path: string): string {
    return path ? `${this.imgBaseUrl}${this.profileSize}/${path}` : "assets/images/profile_placeholder.png"
  }

  setSeasonPosterPath(data: ISeasonResponseObject[]): ISeasonResponseObject[] {
    data.forEach((season: ISeasonResponseObject) => {
      if(!season.poster_path) season["poster_path"] = "assets/images/poster_placeholder.png"
      else season.poster_path = season.poster_path ? `${this.imgBaseUrl}${this.profileSize}/${season.poster_path}` : "assets/images/poster_placeholder.png"
    })
    return data
  }

  setEpisodePosterPath(data: IEpisodeResponseObject): IEpisodeResponseObject {
    if (!data) return data
    if(!data.still_path) data["still_path"] = "assets/images/poster_placeholder.png"
    data.still_path = data.still_path ? `${this.imgBaseUrl}${this.profileSize}/${data.still_path}` : "assets/images/poster_placeholder.png"
    return data
  }
}
