import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
    OnInit,
    ViewChild,
    AfterViewInit,
    OnChanges,
    SimpleChanges,
    ChangeDetectorRef
} from '@angular/core';

import { MapImage } from 'src/app/core/models/map-image.model';
import { Photo } from 'src/app/core/models/photo.model';
import { GoogleMapThemes } from 'src/app/core/models/google-map-themes.model';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MapMarkerInfo } from './map-marker-info.model';

@Component({
    selector: 'app-map-view',
    templateUrl: './map-view.component.html',
    styleUrls: ['./map-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapViewComponent implements OnInit, OnChanges, AfterViewInit {
    options: google.maps.MapOptions;
    activeImageUrl: string = null;
    markers = {};

    @ViewChild(GoogleMap) map: GoogleMap;
    @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

    @Input() activePhoto: Photo;
    @Input() images: MapImage[];
    @Input() mapTypeId = 'roadmap';
    @Input() zoom = 10;
    @Input() useDarkTheme = false;

    @Output() mapTypeChange = new EventEmitter<string>();
    @Output() zoomChange = new EventEmitter<number>();
    @Output() selectPhoto = new EventEmitter<number>();

    ngOnInit() {
        this.updateMapOptions();
    }

    constructor(private changeDetectorRef: ChangeDetectorRef) {

    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateMapOptions();
        this.updateActivePhoto();
    }

    ngAfterViewInit(): void {
        this.updateActivePhoto();

        this.changeDetectorRef.detectChanges();
    }

    onZoomChange() {
        if (this.map) {
            const zoom = this.map.getZoom();

            if (!!zoom) {
                this.zoomChange.emit(zoom);
            }
        }
    }

    onMapTypeChange() {
        if (this.map) {
            const mapTypeId = this.map.getMapTypeId();

            if (!!mapTypeId) {
                this.mapTypeChange.emit(mapTypeId);
            }
        }
    }

    getMapTheme(): google.maps.MapTypeStyle[] {
        if (this.useDarkTheme) {
            return GoogleMapThemes.THEME_DARK;
        } else {
            return GoogleMapThemes.THEME_LIGHT;
        }
    }

    getPosition(image: MapImage) {
        if (!!image && !!image.latitude && !!image.longitude) {
            return new google.maps.LatLng(image.latitude, image.longitude);
        }

        return null;
    }

    getMarkerOptions(marker, image): google.maps.MarkerOptions {
        if (!!image && !!image.latitude && !!image.longitude) {
            // track the marker internally to support navigating across markers from the toolbar
            this.markers[image.imageUrl] = { marker, image };

            return {
                position: this.getPosition(image)
            };
        }

        return null;
    }

    updateActivePhoto() {
        const markerInfo = this.markers[this.activePhoto.imageXsSq.url] as MapMarkerInfo;

        if (!!markerInfo) {
            this.openInfoWindow(markerInfo.marker, markerInfo.image);
        }
    }

    selectActivePhoto(marker: MapMarker, image: MapImage) {
        this.selectPhoto.emit(image.id);

        this.openInfoWindow(marker, image);
    }

    openInfoWindow(marker: MapMarker, image: MapImage) {
        this.activeImageUrl = image.imageUrl;

        this.infoWindow.close();
        this.infoWindow.open(marker);
    }

    private updateMapOptions() {
        this.options = {
            controlSize: 24,
            center: this.getPosition(this.images[0]),
            fullscreenControl: false,
            mapTypeControl: true,
            mapTypeId: this.mapTypeId,
            styles: this.getMapTheme()
        };
    }
}
