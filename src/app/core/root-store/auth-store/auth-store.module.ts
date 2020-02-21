import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AUTH_FEATURE_NAME } from './feature-name';
import { authReducer } from './reducer';
import { AuthStoreEffects } from './effects';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature(AUTH_FEATURE_NAME, authReducer),
        EffectsModule.forFeature([AuthStoreEffects])
    ]
})
export class AuthStoreModule { }
