import { Injectable } from '@angular/core';

import { AuthInitResolver } from '@core/services';

@Injectable()
export class MockAuthInitResolver implements AuthInitResolver {
    public resolve(): boolean {
        return true;
    }
}
