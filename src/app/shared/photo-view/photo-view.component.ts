import { Component, Input, EventEmitter, Output } from '@angular/core';

import { Settings } from 'src/app/core/models/settings.model';
import { Category } from 'src/app/core/models/category.model';
import { Photo } from 'src/app/core/models/photo.model';
import { PhotoEffects } from 'src/app/core/models/photo-effects.model';

@Component({
    selector: 'app-photo-view',
    templateUrl: './photo-view.component.html',
    styleUrls: ['./photo-view.component.scss']
})
export class PhotoViewComponent {
    @Input() settings: Settings;
    @Input() category: Category;
    @Input() photos: Photo[];
    @Input() activePhoto: Photo;
    @Input() effects: PhotoEffects;

    @Output() photoSelected = new EventEmitter<Photo>();

    onSelectPhoto(photo: Photo): void {
        this.photoSelected.emit(photo);
    }
}
