import { CategoryStatSummary } from './category-stat-summary';
import { StatSummary } from './stat-summary';

export interface YearStatSummary extends StatSummary {
    year: number;
    statsByCategory: CategoryStatSummary[];
}
