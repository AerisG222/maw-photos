import { Observable } from 'rxjs';

import { PhotoInfoPanelSettings } from 'src/app/models/settings/photo-info-panel-settings';
import { BaseSettingsFacade } from './base-settings-facade';

export abstract class BasePhotoInfoPanelSettingsFacade extends BaseSettingsFacade<PhotoInfoPanelSettings> {
    abstract settings$: Observable<PhotoInfoPanelSettings>;

    abstract save(settings: PhotoInfoPanelSettings): void;
}
