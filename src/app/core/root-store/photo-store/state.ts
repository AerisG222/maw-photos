import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Photo } from 'src/app/core/models/photo.model';
import { Rating } from '../../models/rating.model';
import { PhotoComment } from '../../models/photo-comment.model';

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
    currentPhotoComments: PhotoComment[];
}

export const initialState: State = photoAdapter.getInitialState({
    isLoading: false,
    error: null,
    currentPhoto: null,
    firstPhoto: null,
    lastPhoto: null,
    currentPhotoRating: null,
    currentPhotoComments: null
});
