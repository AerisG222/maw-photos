import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';

import { RouterStoreEffects } from './effects';
@NgModule({
    declarations: [],
    imports: [
        StoreModule.forFeature('router', fromRouter.routerReducer),
        EffectsModule.forFeature([RouterStoreEffects])
    ]
})
export class RouterStoreModule { }
