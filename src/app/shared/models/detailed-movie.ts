import { ICast, ICrew, IGenre, IVideo } from "./tv-response-object.interface";

export interface DetailedMovie {
        poster_path: string
        title: string,
        synopsis: string,
        id: number,
        releaseDate:string
        popularity: number,
        voteCount: number,
        voteAverage: number
        genres: IGenre[],
        runtime: number,
        cast: ICast[],
        crew: ICrew[],
        videos: IVideo[],
}
