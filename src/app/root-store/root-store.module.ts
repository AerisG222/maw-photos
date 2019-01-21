import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreModule, MetaReducer, State } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import { SettingsStoreModule } from './settings-store';
import { environment } from '../../environments/environment';
import { PhotoCategoryStoreModule } from './photo-category-store/photo-category-store.module';

export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze] : [];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        SettingsStoreModule,
        PhotoCategoryStoreModule,
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router'
        }),
        StoreModule.forRoot({
            router: routerReducer
        }, {
            metaReducers
        }),
        EffectsModule.forRoot([]),
        !environment.production ? StoreDevtoolsModule.instrument() : []
    ]
})
export class RootStoreModule { }
