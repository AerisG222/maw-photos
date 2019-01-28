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
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatToolbarModule
} from '@angular/material';

import { PhotoListComponent } from './photo-list/photo-list.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PhotoViewComponent } from './photo-view/photo-view.component';
import { CategoryHeaderComponent } from './category-header/category-header.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        CategoryHeaderComponent,
        FooterComponent,
        HeaderComponent,
        PhotoListComponent,
        PhotoViewComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatToolbarModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [
        // modules
        FlexLayoutModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatToolbarModule,
        ReactiveFormsModule,

        // components
        CategoryHeaderComponent,
        FooterComponent,
        HeaderComponent,
        PhotoListComponent,
        PhotoViewComponent
    ]
})
export class SharedModule { }
