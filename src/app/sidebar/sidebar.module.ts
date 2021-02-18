import { NgModule } from '@angular/core';

import { BaseModule } from 'src/app/base/base.module';

import { ButtonComponent } from './button/button.component';
import { ButtonDividerComponent } from './button-divider/button-divider.component';
import { ButtonGroupComponent } from './button-group/button-group.component';
import { CardComponent } from './card/card.component';
import { CardDividerComponent } from './card-divider/card-divider.component';
import { CardGroupComponent } from './card-group/card-group.component';
import { CategoryTeaserChooserCardComponent } from './category-teaser-chooser-card/category-teaser-chooser-card.component';
import { CommentsCardComponent } from './comments-card/comments-card.component';
import { MetadataEditorCardComponent } from './metadata-editor-card/metadata-editor-card.component';
import { MinimapCardComponent } from './minimap-card/minimap-card.component';
import { RatingCardComponent } from './rating-card/rating-card.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
    declarations: [
        ButtonComponent,
        ButtonDividerComponent,
        ButtonGroupComponent,
        CardComponent,
        CardDividerComponent,
        CardGroupComponent,
        CategoryTeaserChooserCardComponent,
        CommentsCardComponent,
        MetadataEditorCardComponent,
        MinimapCardComponent,
        RatingCardComponent,
        SidebarComponent,
    ],
    imports: [BaseModule],
    exports: [
        ButtonComponent,
        ButtonDividerComponent,
        ButtonGroupComponent,
        CardComponent,
        CardDividerComponent,
        CardGroupComponent,
        CategoryTeaserChooserCardComponent,
        CommentsCardComponent,
        MetadataEditorCardComponent,
        MinimapCardComponent,
        RatingCardComponent,
        SidebarComponent,
    ],
})
export class SidebarModule {}
