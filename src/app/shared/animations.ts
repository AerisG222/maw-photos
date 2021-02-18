import { animation, style, animate } from '@angular/animations';

export const sidebarShow = animation([
    style({ width: 0 }),
    animate('200ms ease-out', style({ width: 525 })),
]);

export const sidebarHide = animation([
    animate('200ms ease-out', style({ width: 0 })),
]);

export const sidebarCardShow = animation([
    style({
        'max-height': 0,
        opacity: 0,
    }),
    animate(
        '500ms ease-out',
        style({
            'max-height': 650 /* bigger than largest panel */,
            opacity: 1,
        })
    ),
]);

export const sidebarCardHide = animation([
    animate(
        '200ms ease-out',
        style({
            height: 0,
            opacity: 0,
        })
    ),
]);

export const toolbarShow = animation([
    style({
        opacity: 0,
    }),
    animate(
        '300ms ease-out',
        style({
            opacity: 1,
        })
    ),
]);
