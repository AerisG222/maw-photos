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

export const combineStats = (photoStats: TotalStatSummary, videoStats: TotalStatSummary): TotalStatSummary => {
    // TODO: because we use Map, we can't take this hacky approach at cloning...
    const result = JSON.parse(JSON.stringify(photoStats)) as TotalStatSummary;  // clone

    combineStatSummary(result, videoStats);
    result.yearCount = getYearCount(photoStats, videoStats)

    combineYearStats(result.statsByYear, videoStats.statsByYear);

    return result;
}

const getYearCount = (photoStats: TotalStatSummary, videoStats: TotalStatSummary): number => {
    const years = new Set([...photoStats.statsByYear.keys(), ...videoStats.statsByYear.keys()]);

    return years.size;
}

const combineYearStats = (resultStats: Map<number, YearStatSummary>, statsToAdd: Map<number, YearStatSummary>): void => {
    for(const yearStatToAdd of statsToAdd.values()) {
        if(!resultStats.has(yearStatToAdd.year)) {
            const resultYearStat = initStatYearSummary(yearStatToAdd.year);
            resultStats.set(yearStatToAdd.year, resultYearStat);
        }

        const resultYearStat = resultStats.get(yearStatToAdd.year) as YearStatSummary;
        combineStatSummary(resultYearStat, yearStatToAdd);

        for(const catStat of yearStatToAdd.statsByCategory) {
            resultYearStat.statsByCategory.push({...catStat});
        }
    }
}

const combineStatSummary = (result: StatSummary, operand: StatSummary): void => {
    result.categoryCount += operand.categoryCount;
    result.durationSeconds += operand.durationSeconds;
    result.itemCount += operand.itemCount;
    result.size += operand.size;
}
