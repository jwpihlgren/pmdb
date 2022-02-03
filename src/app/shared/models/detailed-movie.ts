import { Cast } from "./cast";
import { Genre } from "./genre";

export interface DetailedMovie {
        posterPath: string
        title: string,
        synopsis: string,
        id: number,
        releaseDate:string
        popularity: number,
        voteCount: number,
        videos: any[],
        voteAverage: number
        genres: Genre[],
        runtime: number,
        credits: Cast[],
}
