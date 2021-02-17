import { CategoryType } from './category-type';
import { MultimediaAsset } from './api/multimedia-asset';

export interface CategoryTeaser {
    route: string;
    id: number;
    year: number;
    name: string;
    type: CategoryType;
    teaserImage: MultimediaAsset;
    teaserImageSq: MultimediaAsset;
}
