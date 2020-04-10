import { NgModule } from '@angular/core';

import { CategoryCardComponent } from './category-card/category-card.component';
import { CategoryGridComponent } from './category-grid/category-grid.component';
import { CategoryHeaderComponent } from './category-header/category-header.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryListToolbarComponent } from './category-list-toolbar/category-list-toolbar.component';
import { CategoryTeaserChooserComponent } from './category-teaser-chooser/category-teaser-chooser.component';
import { CommentsComponent } from './comments/comments.component';
import { HotkeyDialogComponent } from './hotkey-dialog/hotkey-dialog.component';
import { HotkeyTableComponent } from './hotkey-table/hotkey-table.component';
import { MapViewComponent } from './map-view/map-view.component';
import { MetadataEditorComponent } from './metadata-editor/metadata-editor.component';
import { MinimapComponent } from './minimap/minimap.component';
import { MoveNextButtonComponent } from './move-next-button/move-next-button.component';
import { MovePreviousButtonComponent } from './move-previous-button/move-previous-button.component';
import { RatingComponent } from './rating/rating.component';
import { ContentMarginComponent } from './content-margin/content-margin.component';
import { BaseModule } from 'src/app/base/base.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { PrimaryNavModule } from './primary-nav/primary-nav.module';
import { LayoutModule } from './layout/layout.module';

@NgModule({
    declarations: [
        CategoryCardComponent,
        CategoryGridComponent,
        CategoryListComponent,
        CategoryHeaderComponent,
        CategoryListToolbarComponent,
        CategoryTeaserChooserComponent,
        CommentsComponent,
        ContentMarginComponent,
        HotkeyDialogComponent,
        HotkeyTableComponent,
        MapViewComponent,
        MetadataEditorComponent,
        MinimapComponent,
        MoveNextButtonComponent,
        MovePreviousButtonComponent,
        RatingComponent
    ],
    imports: [
        BaseModule,
        LayoutModule,
        PrimaryNavModule,
        SidebarModule,
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
        CategoryTeaserChooserComponent,
        CommentsComponent,
        ContentMarginComponent,
        HotkeyDialogComponent,
        HotkeyTableComponent,
        MapViewComponent,
        MetadataEditorComponent,
        MinimapComponent,
        MoveNextButtonComponent,
        MovePreviousButtonComponent,
        RatingComponent
    ]
})
export class SharedModule { }
