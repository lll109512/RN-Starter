import {
    genRootNavigator,
    genStackNavigator,
    genTabNavigator,
} from 'helper/navigation/navigationHelper';
import {AccountStack} from './account';
import {DiscoverStack} from './discover';
import {HomeStack} from './home';
import {MarketStack} from './market';
import {MeStack} from './me';

// Home tab
const tabs = {
    Home: {
        name: 'HomeScreenNavigator',
        component: HomeStack,
        options: ({i18n}) => ({
            title: i18n('homePage'),
        }),
    },
    Account: {
        name: 'AccountScreenNavigator',
        component: AccountStack,
        options: ({i18n}) => ({
            title: i18n('accountPage'),
        }),
    },
    Market: {
        name: 'MarketScreenNavigator',
        component: MarketStack,
        options: ({i18n}) => ({
            title: i18n('marketPage'),
        }),
    },
    Discover: {
        name: 'DiscoverScreenNavigator',
        component: DiscoverStack,
        options: ({i18n}) => ({
            title: i18n('discoverPage'),
        }),
    },
    Me: {
        name: 'MeScreenNavigator',
        component: MeStack,
        options: ({i18n}) => ({
            title: i18n('mePage'),
        }),
    },
};

export const MainTabNavigator = () =>
    genTabNavigator([
        tabs.Home,
        tabs.Account,
        tabs.Market,
        tabs.Discover,
        tabs.Me,
    ]);

export const RootStack = () =>
    genStackNavigator(
        [
            {
                name: 'MainTab',
                component: MainTabNavigator,
                options: ({i18n}) => ({}),
            },
        ],
        {
            initialRouteName: 'MainTab',
            screenOptions: {
                headerShown: false,
            },
        },
    );

export const RootNavigator = () => genRootNavigator(RootStack, []);
