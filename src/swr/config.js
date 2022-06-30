import { AppState } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { mmkvCacheProvider } from './SWRMMKVProvider';

export const RNConfig = {
    provider: mmkvCacheProvider,
    isOnline() {
        /* 自定义网络状态检测器 */
        return true;
    },
    isVisible() {
        /* 自定义 visibility 状态检测器 */
        return true;
    },
    initFocus(callback) {
        let appState = AppState.currentState;
        const onAppStateChange = (nextAppState) => {
            /* 如果正在从后台或非 active 模式恢复到 active 模式 */
            if (
                appState.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                callback();
            }
            appState = nextAppState;
        };

        // 订阅 app 状态更改事件
        const subscription = AppState.addEventListener(
            'change',
            onAppStateChange,
        );

        return () => {
            subscription.remove();
        };
    },
    initReconnect(callback) {
        /* 向状态 provider 注册侦听器 */
        const unsubscribe = NetInfo.addEventListener((state) => {
            console.log('Connection type', state.type);
            console.log('Is connected?', state.isConnected);
            console.log(state);
            if (state.isConnected) {
                callback();
            } else {
            }
        });
        return () => {
            unsubscribe();
        };
    },
};
