import { MultimediaAsset } from './multimedia-asset.model';

export interface PhotoMultimediaAsset extends MultimediaAsset {
    downloadUrl: string;
}
