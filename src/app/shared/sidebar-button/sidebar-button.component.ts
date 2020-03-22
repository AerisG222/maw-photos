import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-sidebar-button',
    templateUrl: './sidebar-button.component.html',
    styleUrls: ['./sidebar-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarButtonComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
