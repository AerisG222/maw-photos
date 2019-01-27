import { Component, Input } from '@angular/core';

import { Photo } from '../../core/models/photo.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';

@Component({
    selector: 'app-photo-list',
    templateUrl: './photo-list.component.html',
    styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent {
    @Input() photos: Photo[];
    @Input() thumbnailSize: ThumbnailSize;
}
