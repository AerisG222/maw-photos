import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { SettingsStoreModule } from './settings-store';
import { environment } from '../../../environments/environment';
import { PhotoCategoryStoreModule } from './photo-category-store/photo-category-store.module';
import { PhotoStoreModule } from './photo-store/photo-store.module';
import { LayoutStoreModule } from './layout-store/layout-store.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        SettingsStoreModule,
        PhotoCategoryStoreModule,
        StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        PhotoStoreModule,
        LayoutStoreModule
    ]
})
export class RootStoreModule { }
