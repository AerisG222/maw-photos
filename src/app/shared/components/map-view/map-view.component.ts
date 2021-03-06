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
    ChangeDetectorRef,
} from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';

import { Photo, MapImage, GoogleMapThemes, MapType, toMapType } from '@models';
import { MapMarkerInfo } from './map-marker-info.model';

@Component({
    selector: 'app-shared-map-view',
    templateUrl: './map-view.component.html',
    styleUrls: ['./map-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapViewComponent implements OnInit, OnChanges, AfterViewInit {
    @ViewChild(GoogleMap) map: GoogleMap | null = null;
    @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | null = null;

    @Input() activePhoto: Photo | null = null;
    @Input() images: MapImage[] | null = null;
    @Input() mapType = MapType.roadmap;
    @Input() zoom = 10;
    @Input() useDarkTheme = false;

    @Output() mapTypeChange = new EventEmitter<MapType>();
    @Output() zoomChange = new EventEmitter<number>();
    @Output() selectPhoto = new EventEmitter<number>();

    options: google.maps.MapOptions | null = null;
    activeImageUrl: string | null = null;
    markers = new Map<string, MapMarkerInfo>();

    constructor(private changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.updateMapOptions();
    }

    ngOnChanges(): void {
        this.updateActivePhoto();
    }

    ngAfterViewInit(): void {
        this.updateActivePhoto();

        this.changeDetectorRef.detectChanges();
    }

    onZoomChange(): void {
        if (this.map) {
            const zoom = this.map.getZoom();

            if (zoom) {
                this.zoomChange.emit(zoom);
            }
        }
    }

    onMapTypeChange(): void {
        if (this.map) {
            const mapTypeId = this.map.getMapTypeId();
            const mapType = toMapType(mapTypeId);

            if (mapType) {
                this.mapTypeChange.emit(mapType);
            }
        }
    }

    getMapTheme(): google.maps.MapTypeStyle[] {
        if (this.useDarkTheme) {
            return GoogleMapThemes.themeDark;
        } else {
            return GoogleMapThemes.themeLight;
        }
    }

    getPosition(image: MapImage): google.maps.LatLng | null {
        if (!!image && !!image.latitude && !!image.longitude) {
            return new google.maps.LatLng(image.latitude, image.longitude);
        }

        return null;
    }

    getMarkerOptions(
        marker: MapMarker,
        image: MapImage
    ): google.maps.MarkerOptions | null {
        if (!!image && !!image.latitude && !!image.longitude) {
            // track the marker internally to support navigating across markers from the toolbar
            this.markers.set(image.imageUrl, { marker, image });

            return {
                position: this.getPosition(image) ?? undefined,
            };
        }

        return null;
    }

    updateActivePhoto(): void {
        const url = this.activePhoto?.imageXsSq?.url;

        if (url) {
            const markerInfo = this.markers.get(url);

            if (markerInfo) {
                this.openInfoWindow(markerInfo.marker, markerInfo.image);
            }
        }
    }

    selectActivePhoto(marker: MapMarker, image: MapImage): void {
        this.selectPhoto.emit(image.id);

        this.openInfoWindow(marker, image);
    }

    openInfoWindow(marker: MapMarker, image: MapImage): void {
        this.activeImageUrl = image.imageUrl;
        const pos = marker.getPosition();

        if (pos) {
            this.map?.panTo(pos);
        }

        if (this.infoWindow) {
            this.infoWindow.close();
            this.infoWindow.open(marker);
        }
    }

    private updateMapOptions(): void {
        if (this.images) {
            this.options = {
                controlSize: 24,
                center: this.getPosition(this.images[0]) ?? undefined,
                fullscreenControl: false,
                mapTypeControl: true,
                mapTypeId: this.mapType,
                styles: this.getMapTheme(),
            };
        }
    }
}
