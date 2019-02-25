import { Observable } from 'rxjs';

import { PhotoCategory } from 'src/app/core/models/photo-category.model';
import { ExifDetail } from 'src/app/core/models/exif-detail.model';
import { Photo } from 'src/app/core/models/photo.model';
import { Comment } from 'src/app/core/models/comment.model';
import { Rating } from 'src/app/core/models/rating.model';

export const photoApiServiceToken = 'PhotoApiService';

export interface PhotoApiService {
    getCategories(): Observable<PhotoCategory[]>;
    getCategory(categoryId: number): Observable<PhotoCategory>;
    getPhotosByCategory(categoryId: number): Observable<Photo[]>;
    getRandomPhoto(): Observable<Photo>;
    getRandomPhotos(count: number): Observable<Photo[]>;
    getComments(photoId: number): Observable<Comment[]>;
    getExifData(photoId: number): Observable<ExifDetail>;
    getRating(photoId: number): Observable<Rating>;
    ratePhoto(photoId: number, rating: number): Observable<number>;
    addComment(photoId: number, comment: string): Observable<any>;
}
