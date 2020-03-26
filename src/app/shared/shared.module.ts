import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxStarsModule } from 'ngx-stars';

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
import { ToolbarButtonComponent } from './toolbar-button/toolbar-button.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarDividerComponent } from './toolbar-divider/toolbar-divider.component';
import { ToolbarExternalLinkComponent } from './toolbar-external-link/toolbar-external-link.component';
import { ToolbarGroupComponent } from './toolbar-group/toolbar-group.component';
import { ToolbarLinkComponent } from './toolbar-link/toolbar-link.component';
import { BulkEditFilterComponent } from './bulk-edit-filter/bulk-edit-filter.component';
import { BulkEditGpsEditorComponent } from './bulk-edit-gps-editor/bulk-edit-gps-editor.component';
import { SidebarButtonGroupComponent } from './sidebar-button-group/sidebar-button-group.component';
import { SidebarCardGroupComponent } from './sidebar-card-group/sidebar-card-group.component';
import { SidebarButtonDividerComponent } from './sidebar-button-divider/sidebar-button-divider.component';
import { PrimaryNavLinkComponent } from './primary-nav-link/primary-nav-link.component';
import { ScrollPaneComponent } from './scroll-pane/scroll-pane.component';
import { ContentMarginComponent } from './content-margin/content-margin.component';

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
        ToolbarComponent,
        ToolbarGroupComponent,
        ToolbarButtonComponent,
        ToolbarDividerComponent,
        ToolbarExternalLinkComponent,
        ToolbarLinkComponent,
        ScrollPaneComponent,
        SidebarButtonGroupComponent,
        SidebarCardGroupComponent,
        SidebarButtonDividerComponent
    ],
    imports: [
        CommonModule,
        GoogleMapsModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatSelectModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        NgxStarsModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [
        // modules
        GoogleMapsModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatSelectModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        NgxStarsModule,
        ReactiveFormsModule,

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
        ScrollPaneComponent,
        SidebarButtonComponent,
        SidebarButtonDividerComponent,
        SidebarButtonGroupComponent,
        SidebarCardComponent,
        SidebarCardGroupComponent,
        SidebarCardDividerComponent,
        SidebarComponent,
        SlideshowButtonComponent,
        ToolbarComponent,
        ToolbarButtonComponent,
        ToolbarDividerComponent,
        ToolbarExternalLinkComponent,
        ToolbarGroupComponent,
        ToolbarLinkComponent
    ]
})
export class SharedModule { }
