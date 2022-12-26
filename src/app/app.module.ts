import { NgModule } from '@angular/core';
import { HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { PrimaryNavModule } from './primary-nav/primary-nav.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        CoreModule,
        HammerModule,
        MatDialogModule,
        PrimaryNavModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
