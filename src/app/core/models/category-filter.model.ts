export class CategoryFilter {
    static readonly all = new CategoryFilter('All');
    static readonly photos = new CategoryFilter('Photos');
    static readonly videos = new CategoryFilter('Videos');

    static readonly allCategoryFilters = [
        CategoryFilter.all,
        CategoryFilter.photos,
        CategoryFilter.videos
    ];

    readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    static forName(name: string): CategoryFilter {
        switch (name) {
            case CategoryFilter.all.name:
                return CategoryFilter.all;
            case CategoryFilter.photos.name:
                return CategoryFilter.photos;
            case CategoryFilter.videos.name:
                return CategoryFilter.videos;
            default:
                console.error(`invalid category filter requested: ${name}`);
        }

        return null;
    }

    static nextFilter(name: string): CategoryFilter {
        switch (name) {
            case CategoryFilter.all.name:
                return CategoryFilter.photos;
            case CategoryFilter.photos.name:
                return CategoryFilter.videos;
            case CategoryFilter.videos.name:
                return CategoryFilter.all;
            default:
                console.error(`invalid category filter requested: ${name}`);
        }

        return null;
    }
}
