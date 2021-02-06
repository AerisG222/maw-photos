import { Observable } from 'rxjs';

import { PhotoDetailViewSettings } from 'src/app/models/settings/photo-detail-view-settings';
import { BaseSettingsFacade } from './base-settings-facade';

export abstract class BasePhotoDetailSettingsFacade implements BaseSettingsFacade<PhotoDetailViewSettings> {
    abstract settings$: Observable<PhotoDetailViewSettings>;

    abstract save(settings: PhotoDetailViewSettings): void;
}
