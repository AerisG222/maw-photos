import { Action } from '@ngrx/store';

export enum ActionTypes {
    RESET_LAYOUT_REQUEST = '[Layout] Reset Request',
    OPEN_RIGHT_SIDEBAR_REQUEST = '[Layout] Open Right Sidebar Request',
    CLOSE_RIGHT_SIDEBAR_REQUEST = '[Layout] Close Right Sidebar Request',
    TOGGLE_FULLSCREEN_REQUEST = '[Layout] Toggle Fullscreen Request',
    ENTER_FULLSCREEN_REQUEST = '[Layout] Enter Fullscreen Request',
    EXIT_FULLSCREEN_REQUEST = '[Layout] Exit Fullscreen Request',
}

export class ResetLayoutRequestAction implements Action {
    readonly type = ActionTypes.RESET_LAYOUT_REQUEST;
}

export class OpenRightSidebarRequestAction implements Action {
    readonly type = ActionTypes.OPEN_RIGHT_SIDEBAR_REQUEST;
}

export class CloseRightSidebarRequestAction implements Action {
    readonly type = ActionTypes.CLOSE_RIGHT_SIDEBAR_REQUEST;
}

export class ToggleFullscreenRequestAction implements Action {
    readonly type = ActionTypes.TOGGLE_FULLSCREEN_REQUEST;
}

export class EnterFullscreenRequestAction implements Action {
    readonly type = ActionTypes.ENTER_FULLSCREEN_REQUEST;
}

export class ExitFullscreenRequestAction implements Action {
    readonly type = ActionTypes.EXIT_FULLSCREEN_REQUEST;
}

export type Actions =
    ResetLayoutRequestAction |
    OpenRightSidebarRequestAction |
    CloseRightSidebarRequestAction |
    ToggleFullscreenRequestAction |
    EnterFullscreenRequestAction |
    ExitFullscreenRequestAction;
