import { StatSummary } from './stat-summary';
import { StatYearSummary } from './stat-year-summary';

export interface StatTotalSummary extends StatSummary {
    yearCount: number;
    statsByYear: Map<number, StatYearSummary>;
}
