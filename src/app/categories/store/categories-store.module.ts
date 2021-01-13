import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { CategoriesStoreEffects } from './effects';
import { CategoriesStoreRouterEffects } from './effects-router';

@NgModule({
    declarations: [],
    imports: [
        EffectsModule.forFeature([ CategoriesStoreEffects, CategoriesStoreRouterEffects ])
    ]
})
export class CategoriesStoreModule { }
