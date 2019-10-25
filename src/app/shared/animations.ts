import { animation, style, animate } from '@angular/animations';

export const sidebarShow = animation([
    style({ width: 0 }),
    animate('200ms ease-out', style({ width: 525 }))
]);

export const sidebarHide = animation([
    animate('200ms ease-out', style({ width: 0 }))
]);
