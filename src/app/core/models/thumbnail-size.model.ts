export class ThumbnailSize {
    static readonly default = new ThumbnailSize('Default', '');
    static readonly small = new ThumbnailSize('Small', 'thumb-small');
    static readonly verySmall = new ThumbnailSize('Very Small', 'thumb-very-small');

    static readonly allSizes = [
        ThumbnailSize.default,
        ThumbnailSize.small,
        ThumbnailSize.verySmall
    ];

    readonly name: string;
    readonly klass: string;

    constructor(name: string, klass: string) {
        this.name = name;
        this.klass = klass;
    }

    static forName(name: string): ThumbnailSize {
        switch (name) {
            case ThumbnailSize.default.name:
                return ThumbnailSize.default;
            case ThumbnailSize.small.name:
                return ThumbnailSize.small;
            case ThumbnailSize.verySmall.name:
                return ThumbnailSize.verySmall;
            default:
                console.error(`invalid thumbnail size requested: ${name}`);
        }

        return null;
    }
}
