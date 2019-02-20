import { MultimediaAsset } from './multimedia-asset.model';

export interface Photo {
    id:           number;
    categoryId:   number;
    createDate:   string;
    latitude:     number;
    longitude:    number;
    imageXsSq:    MultimediaAsset;
    imageXs:      MultimediaAsset;
    imageSm:      MultimediaAsset;
    imageMd:      MultimediaAsset;
    imageLg:      MultimediaAsset;
    imagePrt:     MultimediaAsset;
    imageSrc:     MultimediaAsset;
    self:         string;
    categoryLink: string;
    commentsLink: string;
    exifLink:     string;
    ratingLink:   string;
}
