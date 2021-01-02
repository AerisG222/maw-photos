import { Observable } from 'rxjs';

export abstract class CategoryTeaserSelectable {
    abstract currentTeaserUrl$: Observable<string | undefined>;

    abstract setCategoryTeaser(): void;
}
