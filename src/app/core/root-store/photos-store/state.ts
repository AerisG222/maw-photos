import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Photo } from 'src/app/models/photo.model';
import { Comment } from 'src/app/models/comment.model';
import { DEFAULT_PHOTO_EFFECTS, PhotoEffects } from 'src/app/models/photo-effects.model';
import { Rating } from 'src/app/models/rating.model';
import { ExifContainer } from 'src/app/models/exif-container';
import { GpsDetail } from 'src/app/models/gps-detail.model';

export const photoAdapter: EntityAdapter<Photo> = createEntityAdapter<Photo>();

// TODO: add properties to flag what info panels are shown
//       then use an effect to load data that will be used rather than requiring the component to request this data

export interface State extends EntityState<Photo> {
    error: string | null;
    isLoading: boolean;
    activePhotoId: number | null;
    activePhotoRating: Rating;
    activePhotoComments: Comment[];
    activePhotoExifData: ExifContainer | null;
    activePhotoEffects: PhotoEffects;
    activePhotoGpsDetail: GpsDetail | null;
    slideshowIsPlaying: boolean;
    isFullscreenView: boolean;
    isMapView: boolean;
    isBulkEditView: boolean;
    isGridView: boolean;
    pendingActionCount: number;
}

export const initialState: State = photoAdapter.getInitialState({
    isLoading: false,
    error: null,
    activePhotoId: null,
    activePhotoRating: { userRating: 0, averageRating: 0 },
    activePhotoComments: [],
    activePhotoExifData: null,
    activePhotoEffects: DEFAULT_PHOTO_EFFECTS,
    activePhotoGpsDetail: null,
    slideshowIsPlaying: false,
    isFullscreenView: false,
    isMapView: false,
    isBulkEditView: false,
    isGridView: false,
    pendingActionCount: 0
});
