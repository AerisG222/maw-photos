import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AndroidComponent } from './android/android.component';
import { HelpDetailsComponent } from './help-details/help-details.component';

import { HelpComponent } from './help/help.component';
import { ReleaseNotesComponent } from './release-notes/release-notes.component';

const routes: Routes = [
    { path: '', component: HelpComponent,
        children: [
            { path: 'help', component: HelpDetailsComponent },
            { path: 'release-notes', component: ReleaseNotesComponent },
            { path: 'android', component: AndroidComponent },
            { path: '', redirectTo: 'help', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: './help/help' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HelpRoutingModule { }
