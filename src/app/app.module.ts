import { NgModule } from '@angular/core';
import { HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        CoreModule,
        HammerModule,
        SharedModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
