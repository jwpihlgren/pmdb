export interface ISearchResult {
    totalPages: number,
    currentPage: number,
    totalResults: number,
    results: ISearchResultItem[]
}

export interface ISearchResultItem {
    posterPath: string,
    name:string,
    date: string,
    mediaType: string,
    id:number
}
