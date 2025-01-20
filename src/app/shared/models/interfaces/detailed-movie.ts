import { ICardOptions } from "../../components/card/card.component"
import { ICast } from "./cast"
import { ICrew } from "./crew"
import { IGenre } from "./genre"
import { IProductionCountry } from "./production-country"
import { IVideo } from "./video"

export interface IDetailedMovie {
  cast: ICast[]
  crew: ICrew[]
  genres: IGenre[]
  id: number
  imdbId: string
  posterPath: string
  popularity: number
  productionCompanies: string[]
  productionCountries: IProductionCountry[]
  releaseDate: string
  runtime: number
  synopsis: string
  title: string
  video?: IVideo
  voteAverage: number
  voteCount: number
  recommendations: ICardOptions[] | undefined
}
