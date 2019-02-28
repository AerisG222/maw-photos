import { CategoryType } from './category-type.model';
import { MultimediaAsset } from './multimedia-asset.model';
import { PhotoCategory } from './photo-category.model';
import { VideoCategory } from './video-category.model';

export interface Category {
    type:          CategoryType;
    categoryRoute: string;
    id:            number;
    name:          string;
    year:          number;
    createDate:    string;
    teaserImage:   MultimediaAsset;
    teaserImageSq: MultimediaAsset;
    actual:        PhotoCategory | VideoCategory;
}
