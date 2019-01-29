import { Action } from '@ngrx/store';

export enum ActionTypes {
    RESET_LAYOUT_REQUEST = '[Layout] Reset Request',
    OPEN_RIGHT_SIDEBAR_REQUEST = '[Layout] Open Right Sidebar Request',
    CLOSE_RIGHT_SIDEBAR_REQUEST = '[Layout] Close Right Sidebar Request'
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

export type Actions =
    ResetLayoutRequestAction |
    OpenRightSidebarRequestAction |
    CloseRightSidebarRequestAction;
