import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SearchStoreEffects } from './effects';
import { SEARCH_FEATURE_NAME } from './feature-name';
import { reducer } from './reducer';

@NgModule({
    declarations: [],
    imports: [
        StoreModule.forFeature(SEARCH_FEATURE_NAME, reducer),
        EffectsModule.forFeature([SearchStoreEffects])
    ]
})
export class SearchStoreModule { }
