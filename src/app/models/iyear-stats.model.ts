import { ICategoryStats } from './icategory-stats.model';

export interface IYearStats {
    year: number;
    categoryStats: ICategoryStats[];
}
