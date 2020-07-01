export class VideoSize {
    static readonly small = new VideoSize('Small', 'video-small');
    static readonly large = new VideoSize('Large', 'video-large');

    static readonly allSizes = [
        VideoSize.small,
        VideoSize.large
    ];

    readonly name: string;
    readonly klass: string;

    constructor(name: string, klass: string) {
        this.name = name;
        this.klass = klass;
    }

    static forName(name: string): VideoSize {
        switch (name) {
            case VideoSize.small.name:
                return VideoSize.small;
            case VideoSize.large.name:
                return VideoSize.large;
            default:
                console.error(`invalid video size requested: ${name}`);
        }

        return VideoSize.small;
    }

    static nextSize(name: string): VideoSize {
        switch (name) {
            case VideoSize.small.name:
                return VideoSize.large;
            case VideoSize.large.name:
                return VideoSize.small;
            default:
                console.error(`invalid video size requested: ${name}`);
        }

        return VideoSize.small;
    }
}
