import { Component, Input } from '@angular/core';

import { IPhoto } from '../models/iphoto.model';

@Component({
    selector: 'app-photo-list',
    templateUrl: './photo-list.component.html',
    styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent {
    @Input() photos: IPhoto[];
}
