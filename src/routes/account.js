import { genStackNavigator } from 'helper/navigation/navigationHelper';
import Account from 'screens/Account';

export const AccountStack = () =>
    genStackNavigator([
        {
            name: 'AccountPage',
            component: Account,
            options: ({i18n}) => ({
                title: i18n('accountPage'),
            }),
        },
    ]);
