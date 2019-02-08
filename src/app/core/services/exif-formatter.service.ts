import { Injectable } from '@angular/core';

import { ExifDetail } from '../models/exif-detail.model';
import { ExifData } from '../models/exif-data.model';
import { ExifCategory } from '../models/exif-category.model';

@Injectable({
    providedIn: 'root'
})
export class ExifFormatterService {
    // tslint:disable:max-line-length
    static readonly _formatMap = {
        'bitsPerSample':           { category: ExifCategory.Exif, displayName: 'Bits per Sample' },
        'compression':             { category: ExifCategory.Exif, displayName: 'Compression' },
        'contrast':                { category: ExifCategory.Exif, displayName: 'Contrast' },
        'createDate':              { category: ExifCategory.Exif, displayName: 'Create Date' },
        'digitalZoomRatio':        { category: ExifCategory.Exif, displayName: 'Digital Zoom Ratio' },
        'exposureCompensation':    { category: ExifCategory.Exif, displayName: 'Exposure Compensation' },
        'exposureMode':            { category: ExifCategory.Exif, displayName: 'Exposure Mode' },
        'exposureProgram':         { category: ExifCategory.Exif, displayName: 'Exposure Program' },
        'exposureTime':            { category: ExifCategory.Exif, displayName: 'Exposure Time' },
        'fNumber':                 { category: ExifCategory.Exif, displayName: 'F Number' },
        'flash':                   { category: ExifCategory.Exif, displayName: 'Flash' },
        'focalLength':             { category: ExifCategory.Exif, displayName: 'Focal Length' },
        'focalLengthIn35mmFormat': { category: ExifCategory.Exif, displayName: 'Focal Length in 35mm Format' },
        'gainControl':             { category: ExifCategory.Exif, displayName: 'Gain Control' },
        'gpsAltitude':             { category: ExifCategory.Exif, displayName: 'GPS Altitude', formatFunc: ExifFormatterService.formatAltitude },
        'gpsDateStamp':            { category: ExifCategory.Exif, displayName: 'GPS Time Stamp' },
        'gpsDirection':            { category: ExifCategory.Exif, displayName: 'GPS Direction' },
        'gpsLatitude':             { category: ExifCategory.Exif, displayName: 'GPS Latitude', formatFunc: ExifFormatterService.formatLatitude },
        'gpsLongitude':            { category: ExifCategory.Exif, displayName: 'GPS Longitude', formatFunc: ExifFormatterService.formatLongitude },
        'gpsMeasureMode':          { category: ExifCategory.Exif, displayName: 'GPS Measure Mode' },
        'gpsSatellites':           { category: ExifCategory.Exif, displayName: 'GPS Satellites' },
        'gpsStatus':               { category: ExifCategory.Exif, displayName: 'GPS Status' },
        'gpsVersionId':            { category: ExifCategory.Exif, displayName: 'GPS Version ID' },
        'iso':                     { category: ExifCategory.Exif, displayName: 'ISO' },
        'lightSource':             { category: ExifCategory.Exif, displayName: 'Light Source' },
        'make':                    { category: ExifCategory.Exif, displayName: 'Make' },
        'meteringMode':            { category: ExifCategory.Exif, displayName: 'Metering Mode' },
        'model':                   { category: ExifCategory.Exif, displayName: 'Model' },
        'orientation':             { category: ExifCategory.Exif, displayName: 'Orientation' },
        'saturation':              { category: ExifCategory.Exif, displayName: 'Saturation' },
        'sceneCaptureType':        { category: ExifCategory.Exif, displayName: 'Scene Capture Type' },
        'sceneType':               { category: ExifCategory.Exif, displayName: 'Scene Type' },
        'sensingMethod':           { category: ExifCategory.Exif, displayName: 'Sensing Method' },
        'sharpness':               { category: ExifCategory.Exif, displayName: 'Sharpness' },

        'autoFocusAreaMode':         { category: ExifCategory.Maker, displayName: 'Auto Focus Area Mode' },
        'autoFocusPoint':            { category: ExifCategory.Maker, displayName: 'Auto Focus Point' },
        'activeDLighting':           { category: ExifCategory.Maker, displayName: 'Active D Lighting' },
        'colorspace':                { category: ExifCategory.Maker, displayName: 'Colorspace' },
        'exposureDifference':        { category: ExifCategory.Maker, displayName: 'Exposure Difference' },
        'flashColorFilter':          { category: ExifCategory.Maker, displayName: 'Flash Color Filter' },
        'flashCompensation':         { category: ExifCategory.Maker, displayName: 'Flash Compensation' },
        'flashControlMode':          { category: ExifCategory.Maker, displayName: 'Flash Control Mode' },
        'flashExposureCompensation': { category: ExifCategory.Maker, displayName: 'Flash Exposure Compensation' },
        'flashFocalLength':          { category: ExifCategory.Maker, displayName: 'Flash Focal Length' },
        'flashMode':                 { category: ExifCategory.Maker, displayName: 'Flash Mode' },
        'flashSetting':              { category: ExifCategory.Maker, displayName: 'Flash Setting' },
        'flashType':                 { category: ExifCategory.Maker, displayName: 'Flash Type' },
        'focusDistance':             { category: ExifCategory.Maker, displayName: 'Focus Distance', formatFunc: ExifFormatterService.distance },
        'focusMode':                 { category: ExifCategory.Maker, displayName: 'Focus Mode' },
        'focusPosition':             { category: ExifCategory.Maker, displayName: 'Focus Position' },
        'highIsoNoiseReduction':     { category: ExifCategory.Maker, displayName: 'High ISO Noise Reduction' },
        'hueAdjustment':             { category: ExifCategory.Maker, displayName: 'Hue Adjustment' },
        'noiseReduction':            { category: ExifCategory.Maker, displayName: 'Noise Reduction' },
        'pictureControlName':        { category: ExifCategory.Maker, displayName: 'Picture Control' },
        'primaryAFPoint':            { category: ExifCategory.Maker, displayName: 'Primary AF Point' },
        'vrMode':                    { category: ExifCategory.Maker, displayName: 'VR Mode' },
        'vibrationReduction':        { category: ExifCategory.Maker, displayName: 'Vibration Reduction' },
        'vignetteControl':           { category: ExifCategory.Maker, displayName: 'Vignette Control' },
        'whiteBalance':              { category: ExifCategory.Maker, displayName: 'White Balance' },

        'aperture':           { category: ExifCategory.Composite, displayName: 'Aperture' },
        'autoFocus':          { category: ExifCategory.Composite, displayName: 'Auto Focus' },
        'depthOfField':       { category: ExifCategory.Composite, displayName: 'Depth Of Field' },
        'fieldOfView':        { category: ExifCategory.Composite, displayName: 'Field of View' },
        'hyperfocalDistance': { category: ExifCategory.Composite, displayName: 'Hyperfocal Distance', formatFunc: ExifFormatterService.distance },
        'lensId':             { category: ExifCategory.Composite, displayName: 'Lens ID' },
        'lightValue':         { category: ExifCategory.Composite, displayName: 'Light Value', formatFunc: ExifFormatterService.fourDecimals },
        'scaleFactor35Efl':   { category: ExifCategory.Composite, displayName: 'Scale Factor 35 EFL' },
        'shutterSpeed':       { category: ExifCategory.Composite, displayName: 'Shutter Speed' }
    };
    // tslint:enable:max-line-length

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

    format(detail: ExifDetail): ExifData[] {
        const exifData = [];

        Object
            .keys(detail)
            .forEach(key => {
                if (detail[key]) {
                    exifData.push(this.getExifData(key, detail[key]));
                }
            });

        return exifData;
    }

    private getExifData(key: string, value: any): ExifData {
        const exif = <ExifData> {};

        exif.sourceField = key;
        exif.sourceValue = value;
        exif.displayValue = value;  // use provided value by default

        const fmt = ExifFormatterService._formatMap[key];

        if (fmt) {
            exif.category = fmt.category;
            exif.displayName = fmt.displayName;

            if (fmt.formatFunc) {
                exif.displayValue = fmt.formatFunc(value);
            }
        } else {
            // console.log(`unknown exif: ${key}`);
        }

        return exif;
    }
}