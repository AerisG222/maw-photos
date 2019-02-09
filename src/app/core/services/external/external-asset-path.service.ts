import { Injectable } from '@angular/core';

import { EnvironmentConfig } from 'src/app/core/models/environment-config';
import { AssetPathService } from '../asset-path.service';

@Injectable()
export class ExternalAssetPathService implements AssetPathService {
    constructor(private _env: EnvironmentConfig) {

    }

    getPath(path: string): string {
        return `${this._env.wwwUrl}${path}`;
    }
}
