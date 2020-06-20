import { MultimediaAsset } from './multimedia-asset.model';

export interface PhotoCategory {
    id: number;
    name: string;
    year: number;
    createDate: Date;
    latitude: number;
    longitude: number;
    photoCount: number;
    totalSizeXs: number;
    totalSizeXsSq: number;
    totalSizeSm: number;
    totalSizeMd: number;
    totalSizeLg: number;
    totalSizePrt: number;
    totalSizeSrc: number;
    totalSize: number;
    teaserImage: MultimediaAsset;
    teaserImageSq: MultimediaAsset;
    self: string;
    photosLink: string;
    downloadLink: string;
    isMissingGpsData: boolean;
}
