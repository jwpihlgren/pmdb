export interface Movie {
    poster: string
    title: string,
    synopsis: string,
    id: number,
    releaseDate:string
    genreIds: number[]
    popularity: number,
    voteCount: number,
    video: boolean,
    voteAverage: number
}
