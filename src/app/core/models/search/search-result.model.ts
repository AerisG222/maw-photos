import { MultimediaCategory } from './multimedia-category.model';

export interface SearchResult {
    results: MultimediaCategory[];
    totalFound: number;
    startIndex: number;
}
