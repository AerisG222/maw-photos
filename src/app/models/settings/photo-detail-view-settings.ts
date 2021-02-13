import { ThumbnailSize } from 'src/app/models/thumbnail-size.model';

export interface PhotoDetailViewSettings {
    showBreadcrumbs: boolean;
    thumbnailSize: ThumbnailSize;
    showPhotoList: boolean;
}

export const DEFAULT_PHOTO_DETAIL_VIEW_SETTINGS: PhotoDetailViewSettings = {
    showBreadcrumbs: true,
    thumbnailSize: ThumbnailSize.default,
    showPhotoList: true,
};
