import { MultimediaAsset } from './multimedia-asset.model';

export interface Video {
    id:           number;
    categoryId:   number;
    createDate:   string;
    latitude:     number;
    longitude:    number;
    duration:     number;
    thumbnailSq:  MultimediaAsset;
    thumbnail:    MultimediaAsset;
    videoScaled:  MultimediaAsset;
    videoFull:    MultimediaAsset;
    videoRaw:     MultimediaAsset;
    self:         string;
    categoryLink: string;
    commentsLink: string;
    ratingLink:   string;
}
