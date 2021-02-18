import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DateService {
    private static readonly defaultDate = new Date(1900, 1, 1);

    safeParse(dt: Date | string): Date {
        if (!dt) {
            return DateService.defaultDate;
        }

        if (typeof dt === 'string') {
            return this.safeParseDate(dt);
        }

        return dt;
    }

    safeParseDate(dt: string): Date {
        try {
            return new Date(dt);
        } catch {
            return DateService.defaultDate;
        }
    }
}
