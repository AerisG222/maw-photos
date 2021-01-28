import { PhotoCategory } from './api/photo-category.model';
import { VideoCategory } from './api/video-category.model';
import { CategoryTeaser } from './category-teaser.model';

export interface Category extends CategoryTeaser {
    createDate: Date;
    actual: PhotoCategory | VideoCategory;
}
