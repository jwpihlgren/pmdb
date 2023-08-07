export interface ITrendingTvShowResult {
    totalPages: number,
    currentPage: number,
    totalResults: number,
    results: ITrendingTvShowItem[]
}

export interface ITrendingTvShowItem {
    adult: boolean
    backdropPath: string
    id: number
    name: string
    originalLanguage: string
    originalName: string
    overview: string
    posterPath: string
    mediaType: string
    genreIds: number[]
    popularity: number
    firstAirDate: string
    voteAverage: number
    voteCount: number
    originCountry: string[]

}
