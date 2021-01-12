import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CATEGORIES_FEATURE_NAME } from './feature-name';
import { CategoriesStoreEffects } from './effects';
import { CategoriesStoreRouterEffects } from './effects-router';
import { reducer } from './reducer';

@NgModule({
    declarations: [],
    imports: [
        StoreModule.forFeature(CATEGORIES_FEATURE_NAME, reducer),
        EffectsModule.forFeature([ CategoriesStoreEffects, CategoriesStoreRouterEffects ])
    ]
})
export class CategoriesStoreModule { }
