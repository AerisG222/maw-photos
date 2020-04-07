import { Layout } from 'src/app/models/layout.model';

export interface State {
    layout: Layout;
}

export const initialState: State = {
    layout: {
        isFullscreen: false
    }
};
