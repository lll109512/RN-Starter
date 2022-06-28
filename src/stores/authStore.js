import create from 'zustand';
import {persist} from 'zustand/middleware';
import {MKKVStorage} from './MKKVStorage';

export const useAuthStore = create(
    persist(
        (set, get) => ({
            token: null,
            expiredAt: null,
            user:null,
            setToken: (value) => set(() => ({token: value})),
            setExpiredat: (value) => set(() => ({expiredAt: value})),
            setUser: (value) => set(() => ({user: value})),
            logout: () => set(() => ({token: null, expiredAt: null})),
        }),
        {name: 'authStore', getStorage: MKKVStorage},
    ),
);
