import { Layout } from '../../models/layout.model';

export interface State {
    layout: Layout;
}

export const initialState: State = {
    layout: {
        isRightNavDisplayed: false,
        isFullscreen: false
    }
};
