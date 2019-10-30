import { Injectable } from '@angular/core';

import { PhotoEffects } from '../models/photo-effects.model';

@Injectable({
  providedIn: 'root'
})
export class EffectStyleBuilderService {
    build(effects: PhotoEffects): string[] {
        const style: string[] = [];

        if (effects.grayscale > 0) {
            style.push('grayscale(' + effects.grayscale + '%)');
        }

        if (effects.sepia > 0) {
            style.push('sepia(' + effects.sepia + '%)');
        }

        if (effects.blur > 0) {
            style.push('blur(' + effects.blur + 'px)');
        }

        if (effects.saturation !== 100) {
            style.push('saturate(' + effects.saturation + '%)');
        }

        if (effects.brightness !== 100) {
            style.push('brightness(' + effects.brightness + '%)');
        }

        if (effects.contrast !== 100) {
            style.push('contrast(' + effects.contrast + '%)');
        }

        if (effects.hueRotate > 0) {
            style.push('hue-rotate(' + effects.hueRotate + 'deg)');
        }

        if (effects.invert > 0) {
            style.push('invert(' + effects.invert + '%)');
        }

        return style;
    }
}
