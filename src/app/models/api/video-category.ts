/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
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

export const isVideoCategory = (varToCheck: any): varToCheck is VideoCategory =>
    varToCheck.videoCount !== undefined;
