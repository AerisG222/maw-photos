import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { LAYOUT_FEATURE_NAME } from './feature-name';
import { reducer } from './reducer';

@NgModule({
    declarations: [],
    imports: [StoreModule.forFeature(LAYOUT_FEATURE_NAME, reducer)],
})
export class LayoutStoreModule {}
