import { Category } from './category.model';
import { Photo } from './photo.model';

export interface PhotoAndCategory {
    photo: Photo;
    category: Category;
}
