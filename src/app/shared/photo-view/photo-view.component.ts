import { Component, Input, EventEmitter, Output } from '@angular/core';

import { Settings } from 'src/app/core/models/settings.model';
import { Category } from 'src/app/core/models/category.model';
import { Photo } from 'src/app/core/models/photo.model';
import { PhotoEffects } from 'src/app/core/models/photo-effects.model';
import { DomSanitizer } from '@angular/platform-browser';

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

    constructor(
        private sanitizer: DomSanitizer
    ) {

    }

    onSelectPhoto(photo: Photo): void {
        this.photoSelected.emit(photo);
    }

    getEffectStyles() {
        const style: string[] = [];

        if (this.effects.grayscale > 0) {
            style.push('grayscale(' + this.effects.grayscale + '%)');
        }
        if (this.effects.sepia > 0) {
            style.push('sepia(' + this.effects.sepia + '%)');
        }
        if (this.effects.blur > 0) {
            style.push('blur(' + this.effects.blur + 'px)');
        }
        if (this.effects.saturation !== 100) {
            style.push('saturate(' + this.effects.saturation + '%)');
        }
        if (this.effects.brightness !== 100) {
            style.push('brightness(' + this.effects.brightness + '%)');
        }
        if (this.effects.contrast !== 100) {
            style.push('contrast(' + this.effects.contrast + '%)');
        }
        if (this.effects.hueRotate > 0) {
            style.push('hue-rotate(' + this.effects.hueRotate + 'deg)');
        }
        if (this.effects.invert > 0) {
            style.push('invert(' + this.effects.invert + '%)');
        }

        if (style.length === 0) {
            return '';
        }

        return this.sanitizer.bypassSecurityTrustStyle(style.join(' '));
    }
}
