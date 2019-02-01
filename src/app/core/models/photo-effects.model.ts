import { PhotoRotation } from './photo-rotation.model';

export interface PhotoEffects {
    rotation: PhotoRotation;
    grayscale: number;
    sepia: number;
    brightness: number;
    saturation: number;
    contrast: number;
    invert: number;
    blur: number;
    hueRotate: number;
}
