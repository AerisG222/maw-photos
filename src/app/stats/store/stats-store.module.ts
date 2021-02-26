import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { StatsStoreEffects } from './effects';

@NgModule({
    declarations: [],
    imports: [EffectsModule.forFeature([StatsStoreEffects])],
})
export class StatsStoreModule {}
