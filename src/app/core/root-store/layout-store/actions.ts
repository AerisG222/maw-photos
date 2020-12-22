import { createAction } from '@ngrx/store';

export const enterFullscreenRequest = createAction(
    '[Layout] Enter Fullscreen Request'
);

export const exitFullscreenRequest = createAction(
    '[Layout] Exit Fullscreen Request'
);

export const toggleFullscreenRequest = createAction(
    '[Layout] Toggle Fullscreen Request'
);
