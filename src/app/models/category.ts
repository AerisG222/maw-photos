import { PhotoCategory } from './api/photo-category';
import { VideoCategory } from './api/video-category';
import { CategoryTeaser } from './category-teaser';

export interface Category extends CategoryTeaser {
    createDate: Date;
    actual: PhotoCategory | VideoCategory;
}
