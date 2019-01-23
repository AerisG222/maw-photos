import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { AppMaterialModule } from '../app-material.module';
import { SearchComponent } from './search/search.component';

@NgModule({
    declarations: [
        SearchComponent
    ],
    imports: [
        AppMaterialModule,
        CommonModule,
        SearchRoutingModule
    ]
})
export class SearchModule { }
