import { isPhotoCategory, PhotoCategory } from '../api/photo-category';
import { isVideoCategory, VideoCategory } from '../api/video-category';
import { StatSummary } from './stat-summary';

export interface CategoryStatSummary extends StatSummary {
    categoryId: number,
    categoryName: string,
}

export const initCategoryStat = (cat: PhotoCategory | VideoCategory): CategoryStatSummary => {
    let itemCount = 0;
    let durationSeconds = 0;

    if(isPhotoCategory(cat)) {
        itemCount = cat.photoCount;
    }
    else if(isVideoCategory(cat)) {
        itemCount = cat.videoCount;
        durationSeconds = cat.totalDuration;
    }

    return {
        categoryCount: 1,
        itemCount,
        size: cat.totalSize,
        durationSeconds,
        categoryId: cat.id,
        categoryName: cat.name
    };
};
