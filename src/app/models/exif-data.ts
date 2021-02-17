import {ExifCategory} from './exif-category';

export interface ExifData {
    category: ExifCategory;
    displayName: string;
    displayValue: string;
    sourceField: string;
    sourceValue: string | number | boolean;
}
