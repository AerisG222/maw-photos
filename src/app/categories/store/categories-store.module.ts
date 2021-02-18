import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { CategoriesStoreEffects } from './effects';

@NgModule({
    declarations: [],
    imports: [EffectsModule.forFeature([CategoriesStoreEffects])],
})
export class CategoriesStoreModule {}
