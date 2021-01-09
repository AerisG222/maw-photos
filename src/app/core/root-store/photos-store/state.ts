import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Photo } from '@models/photo.model';
import { Comment } from '@models/comment.model';
import { DEFAULT_PHOTO_EFFECTS, PhotoEffects } from '@models/photo-effects.model';
import { Rating } from '@models/rating.model';
import { ExifContainer } from '@models/exif-container';
import { GpsDetail } from '@models/gps-detail.model';

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
    pendingActionCount: 0
});
