import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { featureReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { SettingsStoreEffects } from './effects';
import { SETTINGS_FEATURE_NAME } from './selectors';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature(SETTINGS_FEATURE_NAME, featureReducer),
        EffectsModule.forFeature([SettingsStoreEffects])
    ],
    providers: [
        SettingsStoreEffects
    ]
})
export class SettingsStoreModule { }
