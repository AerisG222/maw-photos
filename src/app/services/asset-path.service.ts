import { Injectable } from '@angular/core';

import { IAssetPathService } from './iasset-path.service';
import { EnvironmentConfig } from '../models/environment-config';

@Injectable()
export class AssetPathService implements IAssetPathService {
    constructor(private _env: EnvironmentConfig) {

    }

    getPath(path: string): string {
        return `${this._env.wwwUrl}${path}`;
    }
}
