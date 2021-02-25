import { StatSummary } from './stat-summary';

export interface CategoryStatSummary extends StatSummary {
    categoryId: number,
    categoryName: string,
}
