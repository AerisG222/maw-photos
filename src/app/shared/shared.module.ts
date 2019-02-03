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
    MatToolbarModule
} from '@angular/material';
import { BarRatingModule } from 'ngx-bar-rating';

import { PhotoListComponent } from './photo-list/photo-list.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PhotoViewComponent } from './photo-view/photo-view.component';
import { CategoryHeaderComponent } from './category-header/category-header.component';
import { RouterModule } from '@angular/router';
import { PhotoInfoPanelComponent } from './photo-info-panel/photo-info-panel.component';
import { RatingComponent } from './rating/rating.component';
import { CommentsComponent } from './comments/comments.component';
import { ExifComponent } from './exif/exif.component';
import { EffectsComponent } from './effects/effects.component';
import { CategoryListMiniSettingsComponent } from './category-list-mini-settings/category-list-mini-settings.component';
import { PhotoListMiniSettingsComponent } from './photo-list-mini-settings/photo-list-mini-settings.component';
import { PhotoFullscreenControlComponent } from './photo-fullscreen-control/photo-fullscreen-control.component';

@NgModule({
    declarations: [
        CategoryHeaderComponent,
        CategoryListMiniSettingsComponent,
        FooterComponent,
        HeaderComponent,
        PhotoInfoPanelComponent,
        PhotoListComponent,
        PhotoViewComponent,
        RatingComponent,
        CommentsComponent,
        ExifComponent,
        EffectsComponent,
        PhotoListMiniSettingsComponent,
        PhotoFullscreenControlComponent
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
        ReactiveFormsModule,

        // components
        CategoryHeaderComponent,
        CategoryListMiniSettingsComponent,
        FooterComponent,
        HeaderComponent,
        PhotoInfoPanelComponent,
        PhotoListComponent,
        PhotoListMiniSettingsComponent,
        PhotoViewComponent
    ]
})
export class SharedModule { }
