export interface SearchResult<T> {
    results: T[];
    totalFound: number;
    startIndex: number;
}
