import { Injectable } from '@angular/core';

import { AssetPathService } from './asset-path.service';
import { EnvironmentConfig } from '../models/environment-config';

@Injectable()
export class ExternalAssetPathService implements AssetPathService {
    constructor(private _env: EnvironmentConfig) {

    }

    getPath(path: string): string {
        return `${this._env.wwwUrl}${path}`;
    }
}
