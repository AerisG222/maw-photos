export class CategoryFilter {
    static readonly all = new CategoryFilter('all', 'Photos and Videos');
    static readonly photos = new CategoryFilter('photo', 'Photos');
    static readonly videos = new CategoryFilter('video', 'Videos');

    static readonly allCategoryFilters = [
        CategoryFilter.all,
        CategoryFilter.photos,
        CategoryFilter.videos
    ];

    readonly name: string;
    readonly value: string;

    constructor(value: string, name: string) {
        this.value = value;
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

        return CategoryFilter.all;
    }

    static forValue(value: string): CategoryFilter {
        switch (value) {
            case CategoryFilter.all.value:
                return CategoryFilter.all;
            case CategoryFilter.photos.value:
                return CategoryFilter.photos;
            case CategoryFilter.videos.value:
                return CategoryFilter.videos;
            default:
                console.error(`invalid category filter requested: ${value}`);
        }

        return CategoryFilter.all;
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

        return CategoryFilter.all;
    }
}
