import { IRoAppendedCredits } from "./ro-appended-credits"
import { IRoAppendedVideos } from "./ro-appended-videos"
import { IRoCreatedBy } from "./ro-created-by"
import { IRoEpisode } from "./ro-episode"
import { IRoGenre } from "./ro-genre"
import { IRoNetwork } from "./ro-network"
import { IRoProductionCompany } from "./ro-producing-company"
import { IRoProductionCountry } from "./ro-production-country"
import { IRoSeason } from "./ro-season"
import { IRoSpokenLanguage } from "./ro-spoken-language"
import IroTvRecommendation from "./ro-tv-recommendation"

export interface IRoDetailedTvShow {
    adult: boolean
    backdrop_path: string
    created_by: IRoCreatedBy[]
    episode_run_time: number[]
    first_air_date: string
    genres: IRoGenre[]
    homepage: string
    id: number
    external_ids: IRoExternalId
    in_production: boolean
    languages: string[]
    last_air_date: string
    last_episode_to_air: IRoEpisode
    name: string
    next_episode_to_air: string
    networks: IRoNetwork[]
    number_of_episodes: number
    number_of_seasons: number
    origin_country: string[]
    original_name: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: IRoProductionCompany[]
    production_countries: IRoProductionCountry[]
    seasons: IRoSeason[]
    spoken_languages: IRoSpokenLanguage[],
    vote_average: number
    vote_count: number
    credits: IRoAppendedCredits,
    videos: IRoAppendedVideos
    recommendations: IroTvRecommendation
}

interface IRoExternalId {
  id: number
  imdb_id: string
  freebase_mid: string
  freebase_id: string
  tvdb_id: number
  tvrage_id: number
  wikidata_id: string
  facebook_id: string
  instagram_id: string
  twitter_id: string
}
