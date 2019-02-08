import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
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
    MatTooltipModule
} from '@angular/material';
import { BarRatingModule } from 'ngx-bar-rating';

import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoViewComponent } from './photo-view/photo-view.component';
import { CategoryHeaderComponent } from './category-header/category-header.component';
import { RouterModule } from '@angular/router';
import { PhotoInfoPanelComponent } from './photo-info-panel/photo-info-panel.component';
import { RatingComponent } from './rating/rating.component';
import { CommentsComponent } from './comments/comments.component';
import { ExifComponent } from './exif/exif.component';
import { EffectsComponent } from './effects/effects.component';
import { CategoryListToolbarComponent } from './category-list-toolbar/category-list-toolbar.component';
import { PhotoListToolbarComponent } from './photo-list-toolbar/photo-list-toolbar.component';
import { PhotoListFullscreenToolbarComponent } from './photo-list-fullscreen-toolbar/photo-list-fullscreen-toolbar.component';
import { ExifTableComponent } from './exif-table/exif-table.component';
import { MinimapComponent } from './minimap/minimap.component';
import { MoveNextButtonComponent } from './move-next-button/move-next-button.component';
import { MovePreviousButtonComponent } from './move-previous-button/move-previous-button.component';

@NgModule({
    declarations: [
        CategoryHeaderComponent,
        CategoryListToolbarComponent,
        PhotoInfoPanelComponent,
        PhotoListComponent,
        PhotoViewComponent,
        RatingComponent,
        CommentsComponent,
        ExifComponent,
        EffectsComponent,
        PhotoListToolbarComponent,
        PhotoListFullscreenToolbarComponent,
        ExifTableComponent,
        MinimapComponent,
        MoveNextButtonComponent,
        MovePreviousButtonComponent
    ],
    imports: [
        BarRatingModule,
        CommonModule,
        FlexLayoutModule,
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
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [
        // modules
        BarRatingModule,
        FlexLayoutModule,
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
        ReactiveFormsModule,

        // components
        CategoryHeaderComponent,
        CategoryListToolbarComponent,
        PhotoInfoPanelComponent,
        PhotoListComponent,
        PhotoListToolbarComponent,
        PhotoViewComponent
    ]
})
export class SharedModule { }
