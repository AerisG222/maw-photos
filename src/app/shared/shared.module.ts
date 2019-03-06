import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDialogModule
} from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { BarRatingModule } from 'ngx-bar-rating';

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

@NgModule({
    declarations: [
        CategoryHeaderComponent,
        CategoryListToolbarComponent,
        CommentsComponent,
        EffectsComponent,
        ExifComponent,
        ExifTableComponent,
        HotkeyDialogComponent,
        HotkeyTableComponent,
        InfoPanelComponent,
        MinimapComponent,
        MoveNextButtonComponent,
        MovePreviousButtonComponent,
        PhotoInfoPanelComponent,
        PhotoListComponent,
        PhotoListToolbarComponent,
        PhotoListFullscreenToolbarComponent,
        PhotoViewComponent,
        RatingComponent,
        SlideshowButtonComponent,
        VideoInfoPanelComponent
    ],
    imports: [
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyA50h7G5fm_83lh460EnOdabUC9zU8XF7A'
        }),
        BarRatingModule,
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [
        // modules
        AgmCoreModule,
        BarRatingModule,
        FlexLayoutModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        ReactiveFormsModule,

        // components
        CategoryHeaderComponent,
        CategoryListToolbarComponent,
        CommentsComponent,
        EffectsComponent,
        ExifComponent,
        ExifTableComponent,
        HotkeyDialogComponent,
        HotkeyTableComponent,
        InfoPanelComponent,
        MinimapComponent,
        MoveNextButtonComponent,
        MovePreviousButtonComponent,
        PhotoInfoPanelComponent,
        PhotoListComponent,
        PhotoListToolbarComponent,
        PhotoListFullscreenToolbarComponent,
        PhotoViewComponent,
        RatingComponent,
        SlideshowButtonComponent,
        VideoInfoPanelComponent
    ],
    entryComponents: [
        HotkeyDialogComponent
    ]
})
export class SharedModule { }
