import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { AppComponent } from './app.component';
import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SpaSigninComponent } from './spa-signin/spa-signin.component';
import { RandomComponent } from './random/random.component';
import { YearListComponent } from './year-list/year-list.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import { CategoryComponent } from './category/category.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { SearchComponent } from './search/search.component';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { RootStoreModule } from './root-store';
import { CoreModule } from './core/core.module';

@NgModule({
    declarations: [
        AppComponent,
        CategoryCardComponent,
        CategoryComponent,
        HeaderComponent,
        HomeComponent,
        FooterComponent,
        PhotoListComponent,
        RandomComponent,
        SearchComponent,
        SettingsDialogComponent,
        SpaSigninComponent,
        YearListComponent
    ],
    imports: [
        AppMaterialModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CoreModule,
        NgxWebstorageModule.forRoot({ prefix: 'maw-photos' }),
        RootStoreModule
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        SettingsDialogComponent
    ],
})
export class AppModule { }
