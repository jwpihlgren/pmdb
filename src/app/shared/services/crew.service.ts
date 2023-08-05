import { Injectable } from '@angular/core';
import { ICast } from '../models/interfaces/cast';
import { ICrew } from '../models/interfaces/crew';
import { ICastResponseObject } from '../models/interfaces/response-objects/cast';
import { ICrewResponseObject } from '../models/interfaces/response-objects/crew';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root'
})
export class CrewService {



  constructor(private imageSerive: ImageService) { }

  setCast(cast: ICastResponseObject[]): ICast[] {
    return cast.map((cast: ICastResponseObject) => {
      return {
        id: cast.id,
        character: cast.character,
        name: cast.name,
        order: cast.order,
        profilePath: this.imageSerive.setProfilePath(cast.profile_path)
      }
    })
  }

  setCrew(crew: ICrewResponseObject[]): ICrew[] {
     return crew.map((crew: ICrewResponseObject) => {
      return {
        id: crew.id,
        job: crew.job,
        name: crew.name,
        profilePath: this.imageSerive.setProfilePath(crew.profile_path)
        }
      })
    }
}
