import { Injectable } from '@angular/core';
import { PosterService } from './poster.service';
import { ICast } from '../models/interfaces/cast';
import { ICrew } from '../models/interfaces/crew';
import { IRoCast } from '../models/interfaces/response-objects/ro-cast';
import { IRoCrew } from '../models/interfaces/response-objects/ro-crew';

@Injectable({
  providedIn: 'root'
})
export class CrewService {



  constructor(private imageSerive: PosterService) { }

  setCast(cast: IRoCast[]): ICast[] {
    console.log(cast);
    return cast.map((cast: IRoCast) => {
      return {
        id: cast.id,
        character: cast.character,
        name: cast.name,
        order: cast.order,
        profilePath: this.imageSerive.setProfilePath(cast.profile_path)
      }
    })
  }

  setCrew(crew: IRoCrew[]): ICrew[] {
     return crew.map((crew: IRoCrew) => {
      return {
        id: crew.id,
        job: crew.job,
        name: crew.name,
        profilePath: this.imageSerive.setProfilePath(crew.profile_path)
        }
      })
    }
}
