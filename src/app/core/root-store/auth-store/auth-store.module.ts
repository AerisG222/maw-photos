import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AUTH_FEATURE_NAME } from './feature-name';
import { authReducer } from './reducer';

@NgModule({
    declarations: [],
    imports: [
        StoreModule.forFeature(AUTH_FEATURE_NAME, authReducer)
    ]
})
export class AuthStoreModule { }
