import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Photo } from 'src/app/models/photo.model';
import { Comment } from 'src/app/models/comment.model';
import { PhotoEffects } from 'src/app/models/photo-effects.model';
import { PhotoRotation } from 'src/app/models/photo-rotation.model';
import { Rating } from 'src/app/models/rating.model';
import { ExifContainer } from '../../../models/exif-container';
import { GpsDetail } from '../../../models/gps-detail.model';

export const photoAdapter: EntityAdapter<Photo> = createEntityAdapter<Photo>();

export interface State extends EntityState<Photo> {
    error: string;
    isLoading: boolean;
    currentPhoto: Photo;
    firstPhoto: Photo;
    lastPhoto: Photo;
    currentPhotoRating: Rating;
    currentPhotoComments: Comment[];
    currentPhotoExifData: ExifContainer;
    currentPhotoEffects: PhotoEffects;
    currentPhotoGpsDetail: GpsDetail;
    slideshowIsPlaying: boolean;
    isFullscreenView: boolean;
    isMapView: boolean;
    isBulkEditView: boolean;
    pendingActionCount: number;
}

export const initialState: State = photoAdapter.getInitialState({
    isLoading: false,
    error: null,
    currentPhoto: null,
    firstPhoto: null,
    lastPhoto: null,
    currentPhotoRating: null,
    currentPhotoComments: null,
    currentPhotoExifData: null,
    currentPhotoEffects: {
        rotation: new PhotoRotation(),
        flipHorizontal: false,
        flipVertical: false,
        grayscale: 0,
        sepia: 0,
        brightness: 100,
        saturation: 100,
        contrast: 100,
        invert: 0,
        blur: 0,
        hueRotate: 0
    },
    currentPhotoGpsDetail: null,
    slideshowIsPlaying: false,
    isFullscreenView: false,
    isMapView: false,
    isBulkEditView: false,
    pendingActionCount: 0
});
