export class PhotoRotation {
    static readonly class0 = '';
    static readonly class90 = 'rot90';
    static readonly class180 = 'rot180';
    static readonly class270 = 'rot270';

    constructor(public klass = PhotoRotation.class0) {

    }

    rotateClockwise(): void {
        switch (this.klass) {
            case PhotoRotation.class0:
                this.klass = PhotoRotation.class270;
                break;
            case PhotoRotation.class90:
                this.klass = PhotoRotation.class0;
                break;
            case PhotoRotation.class180:
                this.klass = PhotoRotation.class90;
                break;
            case PhotoRotation.class270:
                this.klass = PhotoRotation.class180;
                break;
            default:
                throw new Error('unexpected klass!');
        }
    }

    rotateCounterClockwise(): void {
        switch (this.klass) {
            case PhotoRotation.class0:
                this.klass = PhotoRotation.class90;
                break;
            case PhotoRotation.class90:
                this.klass = PhotoRotation.class180;
                break;
            case PhotoRotation.class180:
                this.klass = PhotoRotation.class270;
                break;
            case PhotoRotation.class270:
                this.klass = PhotoRotation.class0;
                break;
            default:
                throw new Error('unexpected klass!');
        }
    }
}
