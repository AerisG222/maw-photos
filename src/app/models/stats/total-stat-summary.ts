import { isPhotoCategory } from '../api/photo-category';
import { isVideoCategory } from '../api/video-category';
import { Category } from '../category';
import { StatSummary } from './stat-summary';
import { initStatYearSummary, populateStatYearSummary, YearStatSummary } from './year-stat-summary';

export interface TotalStatSummary extends StatSummary {
    yearCount: number;
    statsByYear: Map<number, YearStatSummary>;
}

export const initTotalSummary = (yearCount: number, categoryCount: number): TotalStatSummary => {
    return {
        yearCount,
        categoryCount,
        itemCount: 0,
        size: 0,
        durationSeconds: 0,
        statsByYear: new Map<number, YearStatSummary>()
    };
};

export const calculateStats = (years: number[], categories: Category[]): TotalStatSummary => {
    const result = initTotalSummary(years.length, categories.length);

    for (const cat of categories) {
        if (isPhotoCategory(cat.actual)) {
            result.itemCount += cat.actual.photoCount;
            result.size += cat.actual.totalSize;
        } else if (isVideoCategory(cat.actual)) {
            result.itemCount += cat.actual.videoCount;
            result.size += cat.actual.totalSize;
            result.durationSeconds += cat.actual.totalDuration;
        }

        populateStatYearSummary(cat.actual, result);
    }

    return result;
};
