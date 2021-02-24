import { StatCategorySummary } from './stat-category-summary';
import { StatSummary } from './stat-summary';

export interface StatYearSummary extends StatSummary {
    year: number;
    statsByCategory: StatCategorySummary[];
}
