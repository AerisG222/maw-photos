import { MultimediaAsset } from './api/multimedia-asset';

export interface PhotoMultimediaAsset extends MultimediaAsset {
    downloadUrl: string;
}
