import {genRootNavigator, genTabNavigator} from 'helper/navigation/navigationHelper';
import { AccountStack } from './account';
import { HomeStack } from './home';

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
            title: i18n('account'),
        }),
    },
};
export const TabNavigator = () => genTabNavigator([tabs.Home, tabs.Account]);


export const RootNavigator = () =>
    genRootNavigator(TabNavigator, []);
