export interface Media {
    poster: string
    title: string,
    synopsis: string,
    id: number,
    genreIds: number[]
    popularity: number,
    voteCount: number,
    video: boolean,
    voteAverage: number,
    mediaType: "tv" | "movie",
    date: string
}
