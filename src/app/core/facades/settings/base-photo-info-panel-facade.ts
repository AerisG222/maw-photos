import { Observable } from 'rxjs';

import { PhotoInfoPanelSettings } from '@models';
import { BaseSettingsFacade } from './base-settings-facade';

export abstract class BasePhotoInfoPanelSettingsFacade extends BaseSettingsFacade<PhotoInfoPanelSettings> {
    abstract settings$: Observable<PhotoInfoPanelSettings>;

    abstract save(settings: PhotoInfoPanelSettings): void;
}
