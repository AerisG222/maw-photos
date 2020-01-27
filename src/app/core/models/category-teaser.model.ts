import { CategoryType } from './category-type.model';

export interface CategoryTeaser {
    route: string;
    id: number;
    year: number;
    name: string;
    teaserImageSqUrl: string;
    type: CategoryType;
}
