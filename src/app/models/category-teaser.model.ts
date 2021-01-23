import { CategoryType } from './category-type.model';
import { MultimediaAsset } from './api/multimedia-asset.model';

export interface CategoryTeaser {
    route: string;
    id: number;
    year: number;
    name: string;
    type: CategoryType;
    teaserImage: MultimediaAsset;
    teaserImageSq: MultimediaAsset;
}
