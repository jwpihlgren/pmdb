import { CrewInMedia } from './crew-in-media';
import { StarredInMedia } from 'src/app/shared/models/starred-in-media';

export interface Person {
    profilePath: string | null,
    birthday: string,
    deathday: null | string,
    id: number,
    name: string,
    biography: string,
    placeOfBirth: string,
    starredIn: StarredInMedia[]
    workedOn: CrewInMedia[]
}
