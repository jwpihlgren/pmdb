import { IRoVideo } from "./ro-Video"
import { IRoAppendedCredits } from "./ro-appended-credits"
import { IRoCast } from "./ro-cast"
import { IRoCrew } from "./ro-crew"
import { IRoGenre } from "./ro-genre"
import { IRoProductionCompany } from "./ro-producing-company"
import { IRoProductionCountry } from "./ro-production-country"
import { IRoSpokenLanguage } from "./ro-spoken-language"

export interface IRoDetailedMovie {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: string
    budget: number
    credits: IRoAppendedCredits,
    genres: IRoGenre[]
    homepage: string
    id: number
    imdb_id: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: IRoProductionCompany[]
    production_countries: IRoProductionCountry[]
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: IRoSpokenLanguage[]
    status: string
    tagline: string
    title: string
    videos: IRoVideo
    vote_average: number
    vote_count: number
}
