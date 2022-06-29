import {genStackNavigator} from 'helper/navigation/navigationHelper';
import Market from 'screens/Market';

export const MarketStack = () =>
    genStackNavigator([
        {
            name: 'MarketPage',
            component: Market,
            options: ({i18n}) => ({
                title: i18n('marketPage'),
                headerShown: false,
            }),
        },
    ]);
