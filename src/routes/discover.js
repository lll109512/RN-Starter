import {genStackNavigator} from 'helper/navigation/navigationHelper';
import Discover from 'screens/Discover';

export const DiscoverStack = () =>
    genStackNavigator([
        {
            name: 'DiscoverPage',
            component: Discover,
            options: ({i18n}) => ({
                title: i18n('discoverPage'),
                headerShown: false,
            }),
        },
    ]);
