import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AndroidComponent } from './android/android.component';
import { HelpComponent } from './help/help.component';
import { AboutComponent } from './about/about.component';
import { ReleaseNotesComponent } from './release-notes/release-notes.component';

const routes: Routes = [
    {
        path: '',
        component: AboutComponent,
        children: [
            { path: 'help', component: HelpComponent },
            { path: 'release-notes', component: ReleaseNotesComponent },
            { path: 'android', component: AndroidComponent },
            { path: '', redirectTo: 'help', pathMatch: 'full' },
        ],
    },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AboutRoutingModule {}
