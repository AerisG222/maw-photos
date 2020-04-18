import { CategoryType } from './category-type.model';
import { MultimediaAsset } from './multimedia-asset.model';
import { PhotoCategory } from './photo-category.model';
import { VideoCategory } from './video-category.model';
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
