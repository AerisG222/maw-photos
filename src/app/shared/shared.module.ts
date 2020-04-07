import { NgModule } from '@angular/core';

import { BulkEditSidebarComponent } from './bulk-edit-sidebar/bulk-edit-sidebar.component';
import { CategoriesLinkComponent } from './categories-link/categories-link.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import { CategoryGridComponent } from './category-grid/category-grid.component';
import { CategoryHeaderComponent } from './category-header/category-header.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryListToolbarComponent } from './category-list-toolbar/category-list-toolbar.component';
import { CategoryTeaserChooserComponent } from './category-teaser-chooser/category-teaser-chooser.component';
import { CommentsComponent } from './comments/comments.component';
import { EffectsComponent } from './effects/effects.component';
import { ExifComponent } from './exif/exif.component';
import { ExifTableComponent } from './exif-table/exif-table.component';
import { FlipHorizontalButtonComponent } from './flip-horizontal-button/flip-horizontal-button.component';
import { FlipVerticalButtonComponent } from './flip-vertical-button/flip-vertical-button.component';
import { HelpLinkComponent } from './help-link/help-link.component';
import { HistogramComponent } from './histogram/histogram.component';
import { HotkeyDialogComponent } from './hotkey-dialog/hotkey-dialog.component';
import { HotkeyTableComponent } from './hotkey-table/hotkey-table.component';
import { MapViewComponent } from './map-view/map-view.component';
import { MetadataEditorComponent } from './metadata-editor/metadata-editor.component';
import { MinimapComponent } from './minimap/minimap.component';
import { MoveNextButtonComponent } from './move-next-button/move-next-button.component';
import { MovePreviousButtonComponent } from './move-previous-button/move-previous-button.component';
import { PhotoSidebarComponent } from './photo-sidebar/photo-sidebar.component';
import { PhotoListBulkEditToolbarComponent } from './photo-list-bulk-edit-toolbar/photo-list-bulk-edit-toolbar.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoListFullscreenToolbarComponent } from './photo-list-fullscreen-toolbar/photo-list-fullscreen-toolbar.component';
import { PhotoListMapToolbarComponent } from './photo-list-map-toolbar/photo-list-map-toolbar.component';
import { PhotoListToolbarComponent } from './photo-list-toolbar/photo-list-toolbar.component';
import { PhotoViewBulkEditComponent } from './photo-view-bulk-edit/photo-view-bulk-edit.component';
import { PhotoViewComponent } from './photo-view/photo-view.component';
import { PhotoViewFullscreenComponent } from './photo-view-fullscreen/photo-view-fullscreen.component';
import { PhotoSelectGridComponent } from './photo-select-grid/photo-select-grid.component';
import { PhotoViewMapComponent } from './photo-view-map/photo-view-map.component';
import { PrimaryNavComponent } from './primary-nav/primary-nav.component';
import { RandomLinkComponent } from './random-link/random-link.component';
import { RatingComponent } from './rating/rating.component';
import { RotateCounterClockwiseButtonComponent } from './rotate-counter-clockwise-button/rotate-counter-clockwise-button.component';
import { RotateClockwiseButtonComponent } from './rotate-clockwise-button/rotate-clockwise-button.component';
import { SearchLinkComponent } from './search-link/search-link.component';
import { SettingsLinkComponent } from './settings-link/settings-link.component';
import { SidebarButtonComponent } from './sidebar-button/sidebar-button.component';
import { SidebarCardComponent } from './sidebar-card/sidebar-card.component';
import { SidebarCardDividerComponent } from './sidebar-card-divider/sidebar-card-divider.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SlideshowButtonComponent } from './slideshow-button/slideshow-button.component';
import { StatsLinkComponent } from './stats-link/stats-link.component';
import { BulkEditFilterComponent } from './bulk-edit-filter/bulk-edit-filter.component';
import { BulkEditGpsEditorComponent } from './bulk-edit-gps-editor/bulk-edit-gps-editor.component';
import { SidebarButtonGroupComponent } from './sidebar-button-group/sidebar-button-group.component';
import { SidebarCardGroupComponent } from './sidebar-card-group/sidebar-card-group.component';
import { SidebarButtonDividerComponent } from './sidebar-button-divider/sidebar-button-divider.component';
import { PrimaryNavLinkComponent } from './primary-nav-link/primary-nav-link.component';
import { ContentMarginComponent } from './content-margin/content-margin.component';
import { BaseModule } from '../base/base.module';
import { ToolbarModule } from './toolbar/toolbar.module';

@NgModule({
    declarations: [
        BulkEditFilterComponent,
        BulkEditGpsEditorComponent,
        BulkEditSidebarComponent,
        CategoryCardComponent,
        CategoryGridComponent,
        CategoryListComponent,
        CategoryHeaderComponent,
        CategoriesLinkComponent,
        CategoryListToolbarComponent,
        CategoryTeaserChooserComponent,
        CommentsComponent,
        ContentMarginComponent,
        EffectsComponent,
        ExifComponent,
        ExifTableComponent,
        FlipHorizontalButtonComponent,
        FlipVerticalButtonComponent,
        HelpLinkComponent,
        HistogramComponent,
        HotkeyDialogComponent,
        HotkeyTableComponent,
        MapViewComponent,
        MetadataEditorComponent,
        MinimapComponent,
        MoveNextButtonComponent,
        MovePreviousButtonComponent,
        PhotoListBulkEditToolbarComponent,
        PhotoListComponent,
        PhotoListFullscreenToolbarComponent,
        PhotoListMapToolbarComponent,
        PhotoListToolbarComponent,
        PhotoSelectGridComponent,
        PhotoSidebarComponent,
        PhotoViewBulkEditComponent,
        PhotoViewComponent,
        PhotoViewFullscreenComponent,
        PhotoViewMapComponent,
        PrimaryNavComponent,
        PrimaryNavLinkComponent,
        RandomLinkComponent,
        RatingComponent,
        RotateCounterClockwiseButtonComponent,
        RotateClockwiseButtonComponent,
        SearchLinkComponent,
        SettingsLinkComponent,
        SidebarButtonComponent,
        SidebarCardComponent,
        SidebarCardDividerComponent,
        SidebarComponent,
        SlideshowButtonComponent,
        StatsLinkComponent,
        SidebarButtonGroupComponent,
        SidebarCardGroupComponent,
        SidebarButtonDividerComponent
    ],
    imports: [
        BaseModule,
        ToolbarModule
    ],
    exports: [
        BaseModule,
        ToolbarModule,

        // components
        BulkEditFilterComponent,
        BulkEditGpsEditorComponent,
        BulkEditSidebarComponent,
        CategoryCardComponent,
        CategoryGridComponent,
        CategoryListComponent,
        CategoryHeaderComponent,
        CategoryListToolbarComponent,
        CategoryTeaserChooserComponent,
        CommentsComponent,
        ContentMarginComponent,
        EffectsComponent,
        ExifComponent,
        ExifTableComponent,
        HistogramComponent,
        HotkeyDialogComponent,
        HotkeyTableComponent,
        MapViewComponent,
        MetadataEditorComponent,
        MinimapComponent,
        MoveNextButtonComponent,
        MovePreviousButtonComponent,
        PhotoListComponent,
        PhotoListBulkEditToolbarComponent,
        PhotoListFullscreenToolbarComponent,
        PhotoListMapToolbarComponent,
        PhotoListToolbarComponent,
        PhotoSelectGridComponent,
        PhotoSidebarComponent,
        PhotoViewBulkEditComponent,
        PhotoViewComponent,
        PhotoViewFullscreenComponent,
        PhotoViewMapComponent,
        PrimaryNavComponent,
        RatingComponent,
        SidebarButtonComponent,
        SidebarButtonDividerComponent,
        SidebarButtonGroupComponent,
        SidebarCardComponent,
        SidebarCardGroupComponent,
        SidebarCardDividerComponent,
        SidebarComponent,
        SlideshowButtonComponent
    ]
})
export class SharedModule { }
