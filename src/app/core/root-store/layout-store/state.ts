import { Layout } from 'src/app/core/models/layout.model';

export interface State {
    layout: Layout;
}

export const initialState: State = {
    layout: {
        isRightNavDisplayed: false,
        isFullscreen: false,
        isMobileView: false
    }
};
