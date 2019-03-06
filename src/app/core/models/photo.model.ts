import { PhotoMultimediaAsset } from './photo-multimedia-asset';

export interface Photo {
    id:           number;
    categoryId:   number;
    createDate:   string;
    latitude:     number;
    longitude:    number;
    imageXsSq:    PhotoMultimediaAsset;
    imageXs:      PhotoMultimediaAsset;
    imageSm:      PhotoMultimediaAsset;
    imageMd:      PhotoMultimediaAsset;
    imageLg:      PhotoMultimediaAsset;
    imagePrt:     PhotoMultimediaAsset;
    imageSrc:     PhotoMultimediaAsset;
    self:         string;
    categoryLink: string;
    commentsLink: string;
    exifLink:     string;
    ratingLink:   string;
}
