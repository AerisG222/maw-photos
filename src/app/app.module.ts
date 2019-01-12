import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SpaSigninComponent } from './spa-signin/spa-signin.component';
import { AuthInterceptor } from './services/auth-interceptor';
import { EnvironmentConfig } from './models/environment-config';
import { AuthConfig } from './models/auth-config';
import { environment } from 'src/environments/environment';
import { RandomComponent } from './random/random.component';
import { YearListComponent } from './year-list/year-list.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import { CategoryComponent } from './category/category.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { SearchComponent } from './search/search.component';
import { AboutDialogComponent } from './about-dialog/about-dialog.component';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        SpaSigninComponent,
        RandomComponent,
        YearListComponent,
        CategoryCardComponent,
        CategoryComponent,
        PhotoListComponent,
        SearchComponent,
        AboutDialogComponent,
        SettingsDialogComponent
    ],
    imports: [
        AppMaterialModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        environment.servicesModule,
        HttpClientModule
    ],
    providers: [
        EnvironmentConfig,
        {
            provide: AuthConfig,
            useFactory: (env: EnvironmentConfig) => {
                return new AuthConfig(
                    env.authUrl,
                    'maw-photos',
                    env.wwwUrl,
                    `${env.wwwUrl}/spa-signin`,
                    `${env.wwwUrl}/spa-silent-signin`
                );
            },
            deps: [ EnvironmentConfig ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        AboutDialogComponent,
        SettingsDialogComponent
      ],
})
export class AppModule { }
