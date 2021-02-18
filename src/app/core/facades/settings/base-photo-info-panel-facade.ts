import { Observable } from 'rxjs';

import { MapType, PhotoInfoPanelSettings } from '@models';
import { BaseSettingsFacade } from './base-settings-facade';

export abstract class BasePhotoInfoPanelSettingsFacade extends BaseSettingsFacade<PhotoInfoPanelSettings> {
    abstract settings$: Observable<PhotoInfoPanelSettings>;

    saveMinimapType(mapType: MapType): void {
        this.saveUpdatedField((x) => (x.minimapMapType = mapType));
    }

    saveMinimapZoom(zoom: number): void {
        this.saveUpdatedField((x) => (x.minimapZoom = zoom));
    }

    toggleSidebar(): void {
        this.saveUpdatedField((x) => (x.expandedState = !x.expandedState));
    }

    toggleRating(): void {
        this.saveUpdatedField((x) => (x.showRatings = !x.showRatings));
    }

    toggleCategoryTeaserChooser(): void {
        this.saveUpdatedField(
            (x) => (x.showCategoryTeaserChooser = !x.showCategoryTeaserChooser)
        );
    }

    toggleComments(): void {
        this.saveUpdatedField((x) => (x.showComments = !x.showComments));
    }

    toggleMetadataEditor(): void {
        this.saveUpdatedField(
            (x) => (x.showMetadataEditor = !x.showMetadataEditor)
        );
    }

    toggleExif(): void {
        this.saveUpdatedField((x) => (x.showExif = !x.showExif));
    }

    toggleHistogram(): void {
        this.saveUpdatedField((x) => (x.showHistogram = !x.showHistogram));
    }

    toggleEffects(): void {
        this.saveUpdatedField((x) => (x.showEffects = !x.showEffects));
    }

    toggleMinimap(): void {
        this.saveUpdatedField((x) => (x.showMinimap = !x.showMinimap));
    }

    abstract save(settings: PhotoInfoPanelSettings): void;
}
