import { ICast, ICrew, IEpisode, IGenre, ISeason } from "./tv-response-object.interface";

export interface DetailedSerie {
    poster_path: string
    name: string,
    synopsis: string,
    id: number,
    firstAirDate:string,
    lastAirDate:string,
    lastEpisodeToAir: IEpisode,
    nextEpisodeToAir: string,
    popularity: number,
    voteCount: number,
    videos: any[],
    voteAverage: number
    genres: IGenre[],
    episodeRuntime: number[],
    crew: ICrew[],
    cast: ICast[],
    numberOfSeasons: number,
    numberOfEpisodes:number,
    seasons: ISeason[],
}
