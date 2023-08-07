export interface ITrendingMovieResult {
    page: number
    results: ITrendingMovieItem[]
    totalPages: number
    totalResults: number
}

export interface ITrendingMovieItem {
    adult: boolean
    id: number
    overview: string
    posterPath: string
    releaseDate: string
    title: string
    voteAverage: number
    voteCount: number
    popularity: number
    originalLanguage: string
    genreIds:number[]
}
