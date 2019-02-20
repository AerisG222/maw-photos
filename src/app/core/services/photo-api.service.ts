import { Observable } from 'rxjs';

import { PhotoCategory } from 'src/app/core/models/photo-category.model';
import { ExifDetail } from 'src/app/core/models/exif-detail.model';
import { Photo } from 'src/app/core/models/photo.model';
import { PhotoComment } from 'src/app/core/models/photo-comment.model';
import { Rating } from 'src/app/core/models/rating.model';

export const photoApiServiceToken = 'PhotoApiService';

export interface PhotoApiService {
    getCategories(): Observable<PhotoCategory[]>;
    getCategory(categoryId: number): Observable<PhotoCategory>;
    getPhotosByCategory(categoryId: number): Observable<Photo[]>;
    getRandomPhoto(): Observable<Photo>;
    getRandomPhotos(count: number): Observable<Photo[]>;
    getCommentsForPhoto(photoId: number): Observable<PhotoComment[]>;
    getPhotoExifData(photoId: number): Observable<ExifDetail>;
    getPhotoRatingData(photoId: number): Observable<Rating>;
    ratePhoto(photoId: number, rating: number): Observable<number>;
    addCommentForPhoto(photoId: number, comment: string): Observable<any>;
}
