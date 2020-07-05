import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

@NgModule({
    declarations: [],
    imports: [
        StoreModule.forFeature('router', fromRouter.routerReducer)
    ]
})
export class RouterStoreModule { }
