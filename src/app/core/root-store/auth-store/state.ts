import { UserInfo, DEFAULT_USER_INFO } from 'src/app/models/user-info.model';

export interface State {
    auth: UserInfo;
}

export const initialState: State = {
    auth: DEFAULT_USER_INFO
};
