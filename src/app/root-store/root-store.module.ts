import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { SettingsStoreModule } from './settings-store';
import { environment } from '../../environments/environment';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        SettingsStoreModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        !environment.production ? StoreDevtoolsModule.instrument() : []
    ]
})
export class RootStoreModule { }
