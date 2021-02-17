import { MultimediaAsset } from './multimedia-asset';

export interface VideoCategory {
    id: number;
    name: string;
    year: number;
    createDate: Date;
    latitude: number | null;
    longitude: number | null;
    videoCount: number;
    totalDuration: number;
    totalSizeThumbnail: number;
    totalSizeThumbnailSq: number;
    totalSizeScaled: number;
    totalSizeFull: number;
    totalSizeRaw: number;
    totalSize: number;
    teaserImage: MultimediaAsset;
    teaserImageSq: MultimediaAsset;
    self: string;
    videosLink: string;
    isMissingGpsData: boolean;
}
