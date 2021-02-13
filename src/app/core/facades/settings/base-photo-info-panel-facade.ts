import { Observable } from 'rxjs';

import { MapType, PhotoInfoPanelSettings } from '@models';
import { BaseSettingsFacade } from './base-settings-facade';

export abstract class BasePhotoInfoPanelSettingsFacade extends BaseSettingsFacade<PhotoInfoPanelSettings> {
    abstract settings$: Observable<PhotoInfoPanelSettings>;

    saveMinimapType(mapType: MapType): void {
        this.saveUpdatedField(x => x.minimapMapType = mapType);
    }

    saveMinimapZoom(zoom: number): void {
        this.saveUpdatedField(x => x.minimapZoom = zoom);
    }

    abstract save(settings: PhotoInfoPanelSettings): void;
}
