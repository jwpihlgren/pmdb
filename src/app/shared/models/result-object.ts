import { SearchResult } from './search-result';
export interface ResultObject {
    totalPages: number,
    currentPage: number,
    totalResults: number,
    results: SearchResult[]
}
