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
import { ContentMarginComponent } from './content-margin/content-margin.component';
import { HotkeyDialogComponent } from './hotkey-dialog/hotkey-dialog.component';
import { HotkeyTableComponent } from './hotkey-table/hotkey-table.component';
import { MapViewComponent } from './map-view/map-view.component';
import { CategoryListItemComponent } from './category-list-item/category-list-item.component';
import { HotkeyListItemComponent } from './hotkey-list-item/hotkey-list-item.component';
import { MarginClassPipe } from './pipes/margin-class.pipe';

@NgModule({
    declarations: [
        CategoryCardComponent,
        CategoryGridComponent,
        CategoryListComponent,
        CategoryHeaderComponent,
        ContentMarginComponent,
        HotkeyDialogComponent,
        HotkeyTableComponent,
        MapViewComponent,
        CategoryListItemComponent,
        HotkeyListItemComponent,
        MarginClassPipe
    ],
    imports: [
        BaseModule
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
        ContentMarginComponent,
        HotkeyDialogComponent,
        HotkeyTableComponent,
        MapViewComponent
    ]
})
export class SharedModule { }
