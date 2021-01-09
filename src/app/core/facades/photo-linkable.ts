import { Photo } from '../../models/photo.model';

export abstract class PhotoLinkable {
    abstract buildPhotoLink(photo: Photo): string;
}
