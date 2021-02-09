import { Observable } from 'rxjs';

import { PhotoGridViewSettings } from 'src/app/models/settings/photo-grid-view-settings';
import { BaseSettingsFacade } from './base-settings-facade';

export abstract class BasePhotoGridSettingsFacade extends BaseSettingsFacade<PhotoGridViewSettings> {
    abstract settings$: Observable<PhotoGridViewSettings>;

    abstract save(settings: PhotoGridViewSettings): void;
}
