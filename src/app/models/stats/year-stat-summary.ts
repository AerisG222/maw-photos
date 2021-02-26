import { isPhotoCategory, PhotoCategory } from '../api/photo-category';
import { isVideoCategory, VideoCategory } from '../api/video-category';
import { CategoryStatSummary, initCategoryStat } from './category-stat-summary';
import { StatSummary } from './stat-summary';
import { TotalStatSummary } from './total-stat-summary';

export interface YearStatSummary extends StatSummary {
    year: number;
    statsByCategory: CategoryStatSummary[];
}

export const initStatYearSummary = (year: number): YearStatSummary => {
    return {
        year,
        categoryCount: 0,
        itemCount: 0,
        size: 0,
        durationSeconds: 0,
        statsByCategory: [],
    };
};

export const populateStatYearSummary = (
    cat: PhotoCategory | VideoCategory,
    result: TotalStatSummary
): void => {
    if (!result.statsByYear.has(cat.year)) {
        result.statsByYear.set(cat.year, initStatYearSummary(cat.year));
    }

    const statYear = result.statsByYear.get(cat.year) as YearStatSummary;

    statYear.categoryCount += 1;

    if (isPhotoCategory(cat)) {
        statYear.itemCount += cat.photoCount;
        statYear.size += cat.totalSize;
    } else if (isVideoCategory(cat)) {
        statYear.itemCount += cat.videoCount;
        statYear.size += cat.totalSize;
        statYear.durationSeconds += cat.totalDuration;
    }

    statYear.statsByCategory.push(initCategoryStat(cat));
};
