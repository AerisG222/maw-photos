import { Injectable } from '@angular/core';

import { IAssetPathService } from './iasset-path.service';

@Injectable()
export class MockAssetPathService implements IAssetPathService {
    getPath(path: string): string {
        return `assets${path}`;
    }
}
