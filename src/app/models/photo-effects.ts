import { PhotoRotation } from './photo-rotation';

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
    flipHorizontal: boolean;
    flipVertical: boolean;
}

export const DEFAULT_PHOTO_EFFECTS: PhotoEffects = {
    rotation: new PhotoRotation(),
    grayscale: 0,
    sepia: 0,
    brightness: 100,
    saturation: 100,
    contrast: 100,
    invert: 0,
    blur: 0,
    hueRotate: 0,
    flipHorizontal: false,
    flipVertical: false,
};
