import { Injectable } from '@angular/core';
import { Size } from '../models/enums/tmdb/size';
import { TmdbConfigService } from './tmdb-config.service';


@Injectable({
  providedIn: 'root'
})
export class PosterService {

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
}
