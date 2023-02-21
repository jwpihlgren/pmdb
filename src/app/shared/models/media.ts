export interface TrendingMediaResponse {
    page : number
    totalPages: number
    totalResults: number
    results: Media[]
}

export interface Media {
    posterPath: string
    title: string
    synopsis: string
    id: number
    genreIds: number[]
    popularity: number
    voteCount: number
    video: boolean
    voteAverage: number
    mediaType: "tv" | "movie"
    date: string
}
