export class CategoryTypeFilter {
    static readonly all = new CategoryTypeFilter('all', 'Photos and Videos');
    static readonly photos = new CategoryTypeFilter('photo', 'Photos');
    static readonly videos = new CategoryTypeFilter('video', 'Videos');

    static readonly allCategoryFilters = [
        CategoryTypeFilter.all,
        CategoryTypeFilter.photos,
        CategoryTypeFilter.videos
    ];

    readonly name: string;
    readonly value: string;

    constructor(value: string, name: string) {
        this.value = value;
        this.name = name;
    }

    static forName(name: string): CategoryTypeFilter {
        switch (name) {
            case CategoryTypeFilter.all.name:
                return CategoryTypeFilter.all;
            case CategoryTypeFilter.photos.name:
                return CategoryTypeFilter.photos;
            case CategoryTypeFilter.videos.name:
                return CategoryTypeFilter.videos;
            default:
                console.error(`invalid category filter requested: ${name}`);
        }

        return CategoryTypeFilter.all;
    }

    static forValue(value: string): CategoryTypeFilter {
        switch (value) {
            case CategoryTypeFilter.all.value:
                return CategoryTypeFilter.all;
            case CategoryTypeFilter.photos.value:
                return CategoryTypeFilter.photos;
            case CategoryTypeFilter.videos.value:
                return CategoryTypeFilter.videos;
            default:
                console.error(`invalid category filter requested: ${value}`);
        }

        return CategoryTypeFilter.all;
    }

    static nextFilter(name: string): CategoryTypeFilter {
        switch (name) {
            case CategoryTypeFilter.all.name:
                return CategoryTypeFilter.photos;
            case CategoryTypeFilter.photos.name:
                return CategoryTypeFilter.videos;
            case CategoryTypeFilter.videos.name:
                return CategoryTypeFilter.all;
            default:
                console.error(`invalid category filter requested: ${name}`);
        }

        return CategoryTypeFilter.all;
    }
}
