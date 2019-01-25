import { CategoryStats } from './category-stats.model';

export interface YearStats {
    year: number;
    categoryStats: CategoryStats[];
}
