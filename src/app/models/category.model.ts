import { CategoryType } from './category-type.model';
import { MultimediaAsset } from './api/multimedia-asset.model';
import { PhotoCategory } from './api/photo-category.model';
import { VideoCategory } from './api/video-category.model';
import { CategoryTeaser } from './category-teaser.model';

export interface Category extends CategoryTeaser{
    route: string;
    id: number;
    year: number;
    name: string;
    type: CategoryType;
    createDate: Date;
    teaserImage: MultimediaAsset;
    teaserImageSq: MultimediaAsset;
    actual: PhotoCategory | VideoCategory;
}
