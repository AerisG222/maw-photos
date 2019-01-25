import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CalendarService {
    time$ = new BehaviorSubject<Date>(new Date());

    private _lastDate = new Date();

    constructor() {
        setInterval(() => {
            const dt = new Date();

            if (dt.getMinutes() !== this._lastDate.getMinutes()) {
                this.time$.next(dt);

                this._lastDate = dt;
            }
        }, 1000, 1000);
    }
}
