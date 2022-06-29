import {genStackNavigator} from 'helper/navigation/navigationHelper';
import Me from 'screens/Me';

export const MeStack = () =>
    genStackNavigator([
        {
            name: 'MePage',
            component: Me,
            options: ({i18n}) => ({
                title: i18n('mePage'),
                headerShown: false,
            }),
        },
    ]);
