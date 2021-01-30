import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import {
    Photo,
    Comment,
    DEFAULT_PHOTO_EFFECTS,
    Rating,
    ExifContainer,
    GpsDetail,
    PhotoEffects,
    Category,
 } from '@models';

export const photoAdapter: EntityAdapter<Photo> = createEntityAdapter<Photo>();

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
    pendingActionCount: number;
    activePhotoCategoryId: number | null;
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
    pendingActionCount: 0,
    activePhotoCategoryId: null
});
