import { Injectable } from '@angular/core';

import { AssetPathService } from './asset-path.service';

@Injectable()
export class MockAssetPathService implements AssetPathService {
    getPath(path: string): string {
        return `assets${path}`;
    }
}
