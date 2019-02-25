import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { ExifData } from 'src/app/core/models/exif-data.model';
import { Photo } from 'src/app/core/models/photo.model';
import { Comment } from 'src/app/core/models/comment.model';
import { PhotoEffects } from 'src/app/core/models/photo-effects.model';
import { PhotoRotation } from 'src/app/core/models/photo-rotation.model';
import { Rating } from 'src/app/core/models/rating.model';

export const photoAdapter: EntityAdapter<Photo> = createEntityAdapter<Photo>({
    sortComparer: (a: Photo, b: Photo): number => b.id - a.id
});

export interface State extends EntityState<Photo> {
    error: string;
    isLoading: boolean;
    currentPhoto: Photo;
    firstPhoto: Photo;
    lastPhoto: Photo;
    currentPhotoRating: Rating;
    currentPhotoComments: Comment[];
    currentPhotoExifData: ExifData[];
    currentPhotoEffects: PhotoEffects;
    slideshowIsPlaying: boolean;
    isFullscreenView: boolean;
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
        grayscale: 0,
        sepia: 0,
        brightness: 100,
        saturation: 100,
        contrast: 100,
        invert: 0,
        blur: 0,
        hueRotate: 0
    },
    slideshowIsPlaying: false,
    isFullscreenView: false
});
