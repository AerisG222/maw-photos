import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DateService {
    // this is a white lie - we are passing in a 'Date' from an api result which is actually a string.  however,
    // we define our model with the desired Date type, so we need to call toString() to make ts believe we are
    // getting a Date in as an argument, however, it will really be a string and the toString() will be a no-op.
    // this is lame, but seems less lame than creating a duplicate set of classes to distinguish proper Date types
    // from our lame Dates we use here...
    safeParse(dt: Date): Date {
        if (!dt) {
            return null;
        }

        return this.safeParseDate(dt.toString());
    }

    safeParseDate(dt: string): Date {
        try {
            return new Date(dt);
        } catch {
            return null;
        }
    }
}
