/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MultimediaAsset } from './multimedia-asset';

export interface PhotoCategory {
    id: number;
    name: string;
    year: number;
    createDate: Date;
    latitude: number | null;
    longitude: number | null;
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

export const isPhotoCategory = (varToCheck: any): varToCheck is PhotoCategory =>
    varToCheck.photoCount !== undefined;
