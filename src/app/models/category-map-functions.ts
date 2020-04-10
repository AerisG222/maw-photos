import { CategoryType } from './category-type.model';
import { PhotoCategory } from './photo-category.model';
import { Category } from './category.model';
import { VideoCategory } from './video-category.model';

export function photoCategoryToCategory(c: PhotoCategory): Category {
    return {
        type: CategoryType.photo,
        categoryRoute: '/photos',
        id: c.id,
        name: c.name,
        year: c.year,
        createDate: c.createDate,
        teaserImage: c.teaserImage,
        teaserImageSq: c.teaserImageSq,
        actual: c
    };
}

export function videoCategoryToCategory(c: VideoCategory): Category {
    return {
        type: CategoryType.video,
        categoryRoute: '/videos',
        id: c.id,
        name: c.name,
        year: c.year,
        createDate: c.createDate,
        teaserImage: c.teaserImage,
        teaserImageSq: c.teaserImageSq,
        actual: c
    };
}
