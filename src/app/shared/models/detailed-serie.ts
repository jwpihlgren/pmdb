import { Cast } from "./cast";
import { Episode } from "./episode";
import { Genre } from "./genre";
import { Season } from "./season";

export interface DetailedSerie {
    poster: string
    name: string,
    synopsis: string,
    id: number,
    firstAirDate:string,
    lastAirDate:string,
    lastEpisodeToAir: Episode,
    nextEpisodeToAir: Episode | null,
    popularity: number,
    voteCount: number,
    videos: any[],
    voteAverage: number
    genres: Genre[],
    episodeRuntime: number[],
    credits: Cast[],
    numberOfSeasons: number,
    numberOfEpisodes:number,
    status: string,
    seasons: Season[]
}
