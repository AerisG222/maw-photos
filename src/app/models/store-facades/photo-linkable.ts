import { Photo } from '../photo.model';

export abstract class PhotoLinkable {
    abstract buildPhotoLink(photo: Photo): string;
}
