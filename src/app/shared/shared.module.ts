import { NgModule } from '@angular/core';

import { BaseModule } from 'src/app/base/base.module';
import { LayoutModule } from '../layout/layout.module';
import { PrimaryNavModule } from '../primary-nav/primary-nav.module';
import { SidebarModule } from '../sidebar/sidebar.module';
import { ToolbarModule } from '../toolbar/toolbar.module';

import { CategoryCardComponent } from './category-card/category-card.component';
import { CategoryGridComponent } from './category-grid/category-grid.component';
import { CategoryHeaderComponent } from './category-header/category-header.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryListToolbarComponent } from './category-list-toolbar/category-list-toolbar.component';
import { ContentMarginComponent } from './content-margin/content-margin.component';
import { HotkeyDialogComponent } from './hotkey-dialog/hotkey-dialog.component';
import { HotkeyTableComponent } from './hotkey-table/hotkey-table.component';
import { MapViewComponent } from './map-view/map-view.component';

@NgModule({
    declarations: [
        CategoryCardComponent,
        CategoryGridComponent,
        CategoryListComponent,
        CategoryHeaderComponent,
        CategoryListToolbarComponent,
        ContentMarginComponent,
        HotkeyDialogComponent,
        HotkeyTableComponent,
        MapViewComponent
    ],
    imports: [
        BaseModule,
        ToolbarModule
    ],
    exports: [
        BaseModule,
        LayoutModule,
        PrimaryNavModule,
        SidebarModule,
        ToolbarModule,

        // components
        CategoryCardComponent,
        CategoryGridComponent,
        CategoryListComponent,
        CategoryHeaderComponent,
        CategoryListToolbarComponent,
        ContentMarginComponent,
        HotkeyDialogComponent,
        HotkeyTableComponent,
        MapViewComponent
    ]
})
export class SharedModule { }
