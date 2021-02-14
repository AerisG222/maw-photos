import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    private readonly prefix = 'maw-photos';
    private readonly separator = '|';
    private strategy: Storage;

    constructor() {
        this.strategy = window.localStorage;
    }

    get<T>(key: string): T | null {
        if(!!!key)
        {
            throw Error('key must be specified');
        }

        const val = this.strategy.getItem(this.normalize(key));

        return val && JSON.parse(val);
    }

    set<T>(key: string, value: T): void {
        this.strategy.setItem(this.normalize(key), JSON.stringify(value));
    }

    clear(key?: string): void {
        if (!!key) {
            this.strategy.removeItem(this.normalize(key));
        } else {
            this.strategy.clear();
        }
    }

    private normalize(key: string): string {
        key = key.toLowerCase();

        return `${this.prefix}${this.separator}${key}`;
    }
}
