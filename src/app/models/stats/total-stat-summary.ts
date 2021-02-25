import { StatSummary } from './stat-summary';
import { YearStatSummary } from './year-stat-summary';

export interface TotalStatSummary extends StatSummary {
    yearCount: number;
    statsByYear: Map<number, YearStatSummary>;
}
