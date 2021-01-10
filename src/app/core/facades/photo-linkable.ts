import { Photo } from '@models';

export abstract class PhotoLinkable {
    abstract buildPhotoLink(photo: Photo): string;
}
