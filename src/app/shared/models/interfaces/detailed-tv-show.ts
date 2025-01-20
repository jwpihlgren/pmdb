import { ICardOptions } from "../../components/card/card.component"
import { ICast } from "./cast"
import { ICrew } from "./crew"
import { IGenre } from "./genre"
import { IProductionCountry } from "./production-country"
import IroTvRecommendation from "./response-objects/ro-tv-recommendation"
import { ISeason } from "./season"

export interface IDetailedTvShow {
  posterPath: string
  name: string,
  synopsis: string,
  id: number,
  imdbId: string
  firstAirDate: string,
  lastAirDate: string,
  popularity: number,
  voteCount: number,
  videos: any[],
  voteAverage: number
  genres: IGenre[],
  episodeRuntime: number[],
  crew: ICrew[],
  cast: ICast[],
  numberOfSeasons: number,
  numberOfEpisodes: number,
  seasons: ISeason[],
  productionCompanies: string[]
  productionCountries: IProductionCountry[],
  recommendations: ICardOptions[] | undefined
}


