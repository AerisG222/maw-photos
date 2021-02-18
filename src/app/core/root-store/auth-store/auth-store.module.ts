import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AUTH_FEATURE_NAME } from './feature-name';
import { reducer } from './reducer';

@NgModule({
    declarations: [],
    imports: [StoreModule.forFeature(AUTH_FEATURE_NAME, reducer)],
})
export class AuthStoreModule {}
