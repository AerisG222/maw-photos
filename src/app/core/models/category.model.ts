import { CategoryType } from './category-type.model';
import { MultimediaAsset } from './multimedia-asset.model';
import { PhotoCategory } from './photo-category.model';
import { VideoCategory } from './video-category.model';

export interface Category {
    type:          CategoryType;
    id:            number;
    name:          string;
    createDate:    string;
    teaserImage:   MultimediaAsset;
    teaserImageSq: MultimediaAsset;
    actual:        PhotoCategory | VideoCategory;
}
