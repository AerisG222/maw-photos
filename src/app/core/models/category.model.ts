import { PhotoInfo } from './photo-info.model';

export interface Category {
    id: number;
    name: string;
    year: number;
    hasGpsData: boolean;
    teaserPhotoInfo: PhotoInfo;
}
