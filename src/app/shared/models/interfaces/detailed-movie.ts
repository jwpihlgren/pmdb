import { ICast } from "./cast"
import { ICrew } from "./crew"
import { IGenre } from "./genre"
import { IVideo } from "./video"

export interface IDetailedMovie {
    cast: ICast[]
    crew: ICrew[]
    genres: IGenre[]
    id: number
    posterPath: string
    popularity: number
    productionCompanies: string[]
    productionCountries: string[]
    releaseDate: string
    runtime: number
    synopsis: string
    title: string
    video?: IVideo
    voteAverage: number
    voteCount: number
}
