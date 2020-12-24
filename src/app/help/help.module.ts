import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { HelpRoutingModule } from './help-routing.module';
import { HelpComponent } from './help/help.component';
import { HelpDetailsComponent } from './help-details/help-details.component';
import { ReleaseNotesComponent } from './release-notes/release-notes.component';
import { AndroidComponent } from './android/android.component';

@NgModule({
    declarations: [
        HelpComponent,
        HelpDetailsComponent,
        ReleaseNotesComponent,
        AndroidComponent
    ],
    imports: [
        HelpRoutingModule,
        SharedModule
    ]
})
export class HelpModule { }
