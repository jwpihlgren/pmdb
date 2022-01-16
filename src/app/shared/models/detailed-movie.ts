import { Genre } from "./genre";

export interface DetailedMovie {
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
        genres: Genre[],
        runtime: number
}
