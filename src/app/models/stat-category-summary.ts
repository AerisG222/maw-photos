import { StatSummary } from './stat-summary';

export interface StatCategorySummary extends StatSummary {
    categoryId: number,
    categoryName: string,
}
