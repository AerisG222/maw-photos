import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CalendarService } from '../../core/services/calendar.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    year$: Observable<number>;
    date$: Observable<Date>;
    version = '0.1.0';

    constructor(private _calSvc: CalendarService) {

    }

    ngOnInit() {
        this.year$ = this._calSvc.time$
            .pipe(
                map(x => x.getFullYear())
            );

        this.date$ = this._calSvc.time$;
    }
}
