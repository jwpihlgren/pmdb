export default interface ITvResponseObject {
    adult: boolean
    backdrop_path: string
    created_by: ICredit[]
    episode_run_time: number[]
    first_air_date: string
    genres: IGenre[]
    homepage: string
    id: number
    in_production: boolean
    languages: string[]
    last_air_date: string
    last_episode_to_air: IEpisode
    name: string
    next_episode_to_air: string
    networks: INetwork[]
    number_of_episodes: number
    number_of_seasons: number
    origin_country: string[]
    original_name: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: IProductionCompany[]
    production_countries: IProductionCountry[]
    seasons: ISeason[]
    spoken_languages: ISpokenLanguage[],
    vote_average: number
    vote_count: number
    credits: IAppendedCredits,
    videos: IAppendedVideos
}

export interface ICredit {
    id: number
    credit_id: string
    name: string
    gender: number
    profile_path: string
}

export interface IEpisode {
    id: number
    name: string
    overview: string
    vote_average: number
    vote_count: number
    air_date: string
    episode_number: number
    production_code: string
    runtime: number
    season_number: number
    show_id: number
    still_path: string
}

export interface IGenre { 
    id: number
    name: string
}

export interface INetwork {
    id: number
    logo_path: string
    name: string
    origin_country: string
}

export interface IProductionCompany {
    id: number
    logo_path: string
    name: string
    origin_country: string
}


export interface IProductionCountry {
    iso_3166_1: string
    name: string
}

export interface ISeason {
    air_date: string
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path: string
    season_number: number
}
export interface ISpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
    status: string
    tagline: string
    type: string
    vote_average: number
    vote_count: number
}

export interface IAppendedCredits {
    id: number
    cast: ICast[]
    crew: ICrew[]
}

export interface ICast {
    adult:boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name :string
    popularity: number
    profile_path: string
    character: string
    credit_id: string
    order: number

}

export interface ICrew {
    adult:boolean
    gender:number
    id:number
    known_for_department:string
    name:string
    original_name:string
    popularity:number
    profile_path:string
    credit_id:string
    department:string
    job:string
}


export interface IAppendedVideos {
    id: number
    results: IVideo[]
}

export interface IVideo{
    iso_639_1: string
    iso_3166_1: string
    name: string
    key: string
    site: string
    size: number
    type: string
    official: boolean
    published_at: string
    id: string
}
