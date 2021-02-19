import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthGuard } from '@core/services';

@Injectable()
export class MockAuthGuard implements AuthGuard {
    public canActivate(): Observable<boolean> | boolean {
        return true;
    }
}
