import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about/about.component';
import { HelpComponent } from './help/help.component';
import { ReleaseNotesComponent } from './release-notes/release-notes.component';
import { AndroidComponent } from './android/android.component';

@NgModule({
    declarations: [
        AboutComponent,
        HelpComponent,
        ReleaseNotesComponent,
        AndroidComponent
    ],
    imports: [
        AboutRoutingModule,
        SharedModule
    ]
})
export class AboutModule { }
