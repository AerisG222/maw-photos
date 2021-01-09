import { Layout } from '@models';

export interface State {
    layout: Layout;
}

export const initialState: State = {
    layout: {
        isFullscreen: false
    }
};
