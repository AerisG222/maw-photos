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
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxStarsModule } from 'ngx-stars';

import { CategoryHeaderComponent } from './category-header/category-header.component';
import { CategoryListToolbarComponent } from './category-list-toolbar/category-list-toolbar.component';
import { CommentsComponent } from './comments/comments.component';
import { EffectsComponent } from './effects/effects.component';
import { ExifComponent } from './exif/exif.component';
import { ExifTableComponent } from './exif-table/exif-table.component';
import { MinimapComponent } from './minimap/minimap.component';
import { MoveNextButtonComponent } from './move-next-button/move-next-button.component';
import { MovePreviousButtonComponent } from './move-previous-button/move-previous-button.component';
import { PhotoInfoPanelComponent } from './photo-info-panel/photo-info-panel.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoListToolbarComponent } from './photo-list-toolbar/photo-list-toolbar.component';
import { PhotoListFullscreenToolbarComponent } from './photo-list-fullscreen-toolbar/photo-list-fullscreen-toolbar.component';
import { PhotoViewComponent } from './photo-view/photo-view.component';
import { RatingComponent } from './rating/rating.component';
import { SlideshowButtonComponent } from './slideshow-button/slideshow-button.component';
import { HotkeyDialogComponent } from './hotkey-dialog/hotkey-dialog.component';
import { HotkeyTableComponent } from './hotkey-table/hotkey-table.component';
import { InfoPanelComponent } from './info-panel/info-panel.component';
import { VideoInfoPanelComponent } from './video-info-panel/video-info-panel.component';
import { HistogramComponent } from './histogram/histogram.component';
import { MapViewComponent } from './map-view/map-view.component';
import { PhotoListMapToolbarComponent } from './photo-list-map-toolbar/photo-list-map-toolbar.component';
import { CategoriesLinkComponent } from './categories-link/categories-link.component';
import { RandomLinkComponent } from './random-link/random-link.component';
import { StatsLinkComponent } from './stats-link/stats-link.component';
import { HelpLinkComponent } from './help-link/help-link.component';
import { SettingsLinkComponent } from './settings-link/settings-link.component';
import { RotateCounterClockwiseButtonComponent } from './rotate-counter-clockwise-button/rotate-counter-clockwise-button.component';
import { RotateClockwiseButtonComponent } from './rotate-clockwise-button/rotate-clockwise-button.component';
import { PrimaryNavComponent } from './primary-nav/primary-nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PhotoViewFullscreenComponent } from './photo-view-fullscreen/photo-view-fullscreen.component';
import { PhotoViewMapComponent } from './photo-view-map/photo-view-map.component';
import { SearchLinkComponent } from './search-link/search-link.component';

@NgModule({
    declarations: [
        CategoryHeaderComponent,
        CategoriesLinkComponent,
        CategoryListToolbarComponent,
        CommentsComponent,
        EffectsComponent,
        ExifComponent,
        ExifTableComponent,
        HelpLinkComponent,
        HistogramComponent,
        HotkeyDialogComponent,
        HotkeyTableComponent,
        InfoPanelComponent,
        MapViewComponent,
        MinimapComponent,
        MoveNextButtonComponent,
        MovePreviousButtonComponent,
        PhotoInfoPanelComponent,
        PhotoListComponent,
        PhotoListFullscreenToolbarComponent,
        PhotoListMapToolbarComponent,
        PhotoListToolbarComponent,
        PhotoViewComponent,
        PhotoViewFullscreenComponent,
        PhotoViewMapComponent,
        PrimaryNavComponent,
        RandomLinkComponent,
        RatingComponent,
        RotateCounterClockwiseButtonComponent,
        RotateClockwiseButtonComponent,
        SettingsLinkComponent,
        SidebarComponent,
        SlideshowButtonComponent,
        StatsLinkComponent,
        VideoInfoPanelComponent,
        SearchLinkComponent
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
        CategoryHeaderComponent,
        CategoriesLinkComponent,
        CategoryListToolbarComponent,
        CommentsComponent,
        EffectsComponent,
        ExifComponent,
        ExifTableComponent,
        HelpLinkComponent,
        HistogramComponent,
        HotkeyDialogComponent,
        HotkeyTableComponent,
        InfoPanelComponent,
        MapViewComponent,
        MinimapComponent,
        MoveNextButtonComponent,
        MovePreviousButtonComponent,
        PhotoInfoPanelComponent,
        PhotoListComponent,
        PhotoListFullscreenToolbarComponent,
        PhotoListMapToolbarComponent,
        PhotoListToolbarComponent,
        PhotoViewComponent,
        PhotoViewFullscreenComponent,
        PhotoViewMapComponent,
        PrimaryNavComponent,
        RandomLinkComponent,
        RatingComponent,
        SearchLinkComponent,
        SettingsLinkComponent,
        SidebarComponent,
        SlideshowButtonComponent,
        StatsLinkComponent,
        VideoInfoPanelComponent
    ]
})
export class SharedModule { }
