import { NgModule } from '@angular/core';

import { BaseModule } from 'src/app/base/base.module';
import { LayoutModule } from '../layout/layout.module';
import { SidebarModule } from '../sidebar/sidebar.module';
import { ToolbarModule } from '../toolbar/toolbar.module';

import { CategoryCardComponent } from './components/category-card/category-card.component';
import { CategoryGridComponent } from './components/category-grid/category-grid.component';
import { CategoryHeaderComponent } from './components/category-header/category-header.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ContentMarginComponent } from './components/content-margin/content-margin.component';
import { HotkeyDialogComponent } from './components/hotkey-dialog/hotkey-dialog.component';
import { HotkeyTableComponent } from './components/hotkey-table/hotkey-table.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { CategoryListItemComponent } from './components/category-list-item/category-list-item.component';
import { HotkeyListItemComponent } from './components/hotkey-list-item/hotkey-list-item.component';
import { MarginClassPipe } from './pipes/margin-class.pipe';
import { ThemeIsDarkPipe } from './pipes/theme-is-dark.pipe';
import { ThumbnailSizeClassPipe } from './pipes/thumbnail-size-class.pipe';

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
        MarginClassPipe,
        ThemeIsDarkPipe,
        ThumbnailSizeClassPipe,
    ],
    imports: [BaseModule],
    exports: [
        BaseModule,
        LayoutModule,
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
        MapViewComponent,

        // pipes
        ThemeIsDarkPipe,
        ThumbnailSizeClassPipe,
    ],
})
export class SharedModule {}
