import { MultimediaAsset } from './api/multimedia-asset.model';

export interface PhotoMultimediaAsset extends MultimediaAsset {
    downloadUrl: string;
}
