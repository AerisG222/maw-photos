import { Injectable } from '@angular/core';

import { ExifCategory } from 'src/app/models/exif-category.model';
import { ExifData } from 'src/app/models/exif-data.model';
import { ExifDetail } from 'src/app/models/exif-detail.model';
import { ExifContainer } from 'src/app/models/exif-container';

interface FormatInstruction {
    category: ExifCategory;
    displayName: string;
    formatFunc?: (val: number) => string;
}

@Injectable({
    providedIn: 'root'
})
export class ExifFormatterService {
    /* eslint-disable max-len */
    static readonly formatMap = new Map<string, FormatInstruction>([
        ['bitsPerSample',           { category: ExifCategory.exif, displayName: 'Bits per Sample' }],
        ['compression',             { category: ExifCategory.exif, displayName: 'Compression' }],
        ['contrast',                { category: ExifCategory.exif, displayName: 'Contrast' }],
        ['createDate',              { category: ExifCategory.exif, displayName: 'Create Date' }],
        ['digitalZoomRatio',        { category: ExifCategory.exif, displayName: 'Digital Zoom Ratio' }],
        ['exposureCompensation',    { category: ExifCategory.exif, displayName: 'Exposure Compensation' }],
        ['exposureMode',            { category: ExifCategory.exif, displayName: 'Exposure Mode' }],
        ['exposureProgram',         { category: ExifCategory.exif, displayName: 'Exposure Program' }],
        ['exposureTime',            { category: ExifCategory.exif, displayName: 'Exposure Time' }],
        ['fNumber',                 { category: ExifCategory.exif, displayName: 'F Number' }],
        ['flash',                   { category: ExifCategory.exif, displayName: 'Flash' }],
        ['focalLength',             { category: ExifCategory.exif, displayName: 'Focal Length' }],
        ['focalLengthIn35mmFormat', { category: ExifCategory.exif, displayName: 'Focal Length in 35mm Format' }],
        ['gainControl',             { category: ExifCategory.exif, displayName: 'Gain Control' }],
        ['gpsAltitude',             { category: ExifCategory.exif, displayName: 'GPS Altitude', formatFunc: ExifFormatterService.formatAltitude }],
        ['gpsDateStamp',            { category: ExifCategory.exif, displayName: 'GPS Time Stamp' }],
        ['gpsDirection',            { category: ExifCategory.exif, displayName: 'GPS Direction' }],
        ['gpsLatitude',             { category: ExifCategory.exif, displayName: 'GPS Latitude', formatFunc: ExifFormatterService.formatLatitude }],
        ['gpsLongitude',            { category: ExifCategory.exif, displayName: 'GPS Longitude', formatFunc: ExifFormatterService.formatLongitude }],
        ['gpsMeasureMode',          { category: ExifCategory.exif, displayName: 'GPS Measure Mode' }],
        ['gpsSatellites',           { category: ExifCategory.exif, displayName: 'GPS Satellites' }],
        ['gpsStatus',               { category: ExifCategory.exif, displayName: 'GPS Status' }],
        ['gpsVersionId',            { category: ExifCategory.exif, displayName: 'GPS Version ID' }],
        ['iso',                     { category: ExifCategory.exif, displayName: 'ISO' }],
        ['lightSource',             { category: ExifCategory.exif, displayName: 'Light Source' }],
        ['make',                    { category: ExifCategory.exif, displayName: 'Make' }],
        ['meteringMode',            { category: ExifCategory.exif, displayName: 'Metering Mode' }],
        ['model',                   { category: ExifCategory.exif, displayName: 'Model' }],
        ['orientation',             { category: ExifCategory.exif, displayName: 'Orientation' }],
        ['saturation',              { category: ExifCategory.exif, displayName: 'Saturation' }],
        ['sceneCaptureType',        { category: ExifCategory.exif, displayName: 'Scene Capture Type' }],
        ['sceneType',               { category: ExifCategory.exif, displayName: 'Scene Type' }],
        ['sensingMethod',           { category: ExifCategory.exif, displayName: 'Sensing Method' }],
        ['sharpness',               { category: ExifCategory.exif, displayName: 'Sharpness' }],

        ['autoFocusAreaMode',         { category: ExifCategory.maker, displayName: 'Auto Focus Area Mode' }],
        ['autoFocusPoint',            { category: ExifCategory.maker, displayName: 'Auto Focus Point' }],
        ['activeDLighting',           { category: ExifCategory.maker, displayName: 'Active D Lighting' }],
        ['colorspace',                { category: ExifCategory.maker, displayName: 'Colorspace' }],
        ['exposureDifference',        { category: ExifCategory.maker, displayName: 'Exposure Difference' }],
        ['flashColorFilter',          { category: ExifCategory.maker, displayName: 'Flash Color Filter' }],
        ['flashCompensation',         { category: ExifCategory.maker, displayName: 'Flash Compensation' }],
        ['flashControlMode',          { category: ExifCategory.maker, displayName: 'Flash Control Mode' }],
        ['flashExposureCompensation', { category: ExifCategory.maker, displayName: 'Flash Exposure Compensation' }],
        ['flashFocalLength',          { category: ExifCategory.maker, displayName: 'Flash Focal Length' }],
        ['flashMode',                 { category: ExifCategory.maker, displayName: 'Flash Mode' }],
        ['flashSetting',              { category: ExifCategory.maker, displayName: 'Flash Setting' }],
        ['flashType',                 { category: ExifCategory.maker, displayName: 'Flash Type' }],
        ['focusDistance',             { category: ExifCategory.maker, displayName: 'Focus Distance', formatFunc: ExifFormatterService.distance }],
        ['focusMode',                 { category: ExifCategory.maker, displayName: 'Focus Mode' }],
        ['focusPosition',             { category: ExifCategory.maker, displayName: 'Focus Position' }],
        ['highIsoNoiseReduction',     { category: ExifCategory.maker, displayName: 'High ISO Noise Reduction' }],
        ['hueAdjustment',             { category: ExifCategory.maker, displayName: 'Hue Adjustment' }],
        ['noiseReduction',            { category: ExifCategory.maker, displayName: 'Noise Reduction' }],
        ['pictureControlName',        { category: ExifCategory.maker, displayName: 'Picture Control' }],
        ['primaryAFPoint',            { category: ExifCategory.maker, displayName: 'Primary AF Point' }],
        ['vrMode',                    { category: ExifCategory.maker, displayName: 'VR Mode' }],
        ['vibrationReduction',        { category: ExifCategory.maker, displayName: 'Vibration Reduction' }],
        ['vignetteControl',           { category: ExifCategory.maker, displayName: 'Vignette Control' }],
        ['whiteBalance',              { category: ExifCategory.maker, displayName: 'White Balance' }],

        ['aperture',           { category: ExifCategory.composite, displayName: 'Aperture' }],
        ['autoFocus',          { category: ExifCategory.composite, displayName: 'Auto Focus' }],
        ['depthOfField',       { category: ExifCategory.composite, displayName: 'Depth Of Field' }],
        ['fieldOfView',        { category: ExifCategory.composite, displayName: 'Field of View' }],
        ['hyperfocalDistance', { category: ExifCategory.composite, displayName: 'Hyperfocal Distance', formatFunc: ExifFormatterService.distance }],
        ['lensId',             { category: ExifCategory.composite, displayName: 'Lens ID' }],
        ['lightValue',         { category: ExifCategory.composite, displayName: 'Light Value', formatFunc: ExifFormatterService.fourDecimals }],
        ['scaleFactor35Efl',   { category: ExifCategory.composite, displayName: 'Scale Factor 35 EFL' }],
        ['shutterSpeed',       { category: ExifCategory.composite, displayName: 'Shutter Speed' }]
    ]);
    /* eslint-enable max-len */

    private static fourDecimals(val: number): string {
        return val.toFixed(4);
    }

    private static distance(val: number): string {
        return `${val.toFixed(2)} m`;
    }

    private static formatLatitude(val: number): string {
        if (val >= 0) {
            return `${val} (North)`;
        } else {
            return `${val} (South)`;
        }
    }

    private static formatLongitude(val: number): string {
        if (val >= 0) {
            return `${val} (East)`;
        } else {
            return `${val} (West)`;
        }
    }

    private static formatAltitude(val: number): string {
        if (val >= 0) {
            return `${val} m Above Sea Level`;
        } else {
            return `${val} m Below Sea Level`;
        }
    }

    format(detail: ExifDetail): ExifContainer {
        const container = new ExifContainer();

        Object
            .keys(detail)
            .forEach(key => {
                const val = detail[key] as string | number | boolean;

                if (!!val) {
                    const cfg = ExifFormatterService.formatMap.get(key);

                    if (!!cfg) {
                        switch (cfg.category) {
                            case ExifCategory.exif:
                                container.exif.push(this.getExifData(key, val, cfg));
                                break;
                            case ExifCategory.maker:
                                container.maker.push(this.getExifData(key, val, cfg));
                                break;
                            case ExifCategory.composite:
                                container.composite.push(this.getExifData(key, val, cfg));
                                break;
                        }
                    }
                }
            });

        return container;
    }

    private getExifData(key: string, value: string | number | boolean, cfg: FormatInstruction): ExifData {
        const exif = {} as ExifData;

        exif.sourceField = key;
        exif.sourceValue = typeof(value) === 'string' ? value : value.toString();
        exif.displayValue = exif.sourceValue;
        exif.category = cfg.category;
        exif.displayName = cfg.displayName;

        if (!!cfg.formatFunc) {
            exif.displayValue = cfg.formatFunc(value as number);
        }

        return exif;
    }
}
