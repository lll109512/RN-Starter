import client from 'helper/httpClient';
import {get} from 'lodash';
import {useAuthStore} from 'stores/authStore';

export const useAuth = () => {
    const state = useAuthStore((state) => state);
    return {
        ...state,
        isLoggedIn: Boolean(get(state,'token')),
        login: async ({username, password}) => {
            try {
                const {result: auth} = await httpClient.post(
                    ['login'],
                    cleanObjectNilValue({
                        username,
                        password,
                    }),
                );
                client.onSending = (req) => {
                    req.set('Authorization', `bearer ${get(auth, 'token')}`);
                };
                state.setToken(get(auth, 'token'));
                state.setUser(get(auth, 'user'));
            } catch (error) {
                throw error;
            }
        },
        logout: (noRedirect) => {
            state.logout();
            delete httpClient.onSending;
        },
        register: async ({userName, password}) => {},
        init: () => {
            if (state.token) {
                client.onSending = (req) => {
                    req.set('Authorization', `bearer ${state.token}`);
                };
            }
        },
    };
};
