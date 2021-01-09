import { Injectable } from '@angular/core';

import { PhotoEffects } from '@models';

@Injectable({
  providedIn: 'root'
})
export class EffectStyleBuilderService {
    buildFilter(effects: PhotoEffects): string[] {
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

    buildTransform(effects: PhotoEffects): string[] {
        const transforms = [];

        switch (effects.rotation.klass) {
            case 'rot90':
                transforms.push('rotate(-90deg)');
                break;
            case 'rot180':
                transforms.push('rotate(-180deg)');
                break;
            case 'rot270':
                transforms.push('rotate(-270deg)');
                break;
        }

        if (effects.flipHorizontal) {
            transforms.push('scaleX(-1)');
        }

        if (effects.flipVertical) {
            transforms.push('scaleY(-1)');
        }

        return transforms;
    }
}
