import { ICast } from "./cast"
import { ICrew } from "./crew"
import { IGenre } from "./genre"
import { ISeason } from "./season"

export interface IDetailedTvShow {
    posterPath: string
    name: string,
    synopsis: string,
    id: number,
    firstAirDate:string,
    lastAirDate:string,
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
