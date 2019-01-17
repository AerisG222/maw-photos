import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { settingsReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { SettingsStoreEffects } from './effects';
import { SETTINGS_FEATURE_NAME } from './selectors';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature(SETTINGS_FEATURE_NAME, settingsReducer),
        EffectsModule.forFeature([SettingsStoreEffects])
    ],
    providers: [
        SettingsStoreEffects
    ]
})
export class SettingsStoreModule { }
