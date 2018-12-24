import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent
    ],
    imports: [
        AppMaterialModule,
        AppRoutingModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
