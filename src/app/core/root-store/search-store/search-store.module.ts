import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SearchStoreEffects } from './effects';
import { SEARCH_FEATURE_NAME } from './feature-name';
import { searchReducer } from './reducer';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature(SEARCH_FEATURE_NAME, searchReducer),
        EffectsModule.forFeature([SearchStoreEffects])
    ]
})
export class SearchStoreModule { }
