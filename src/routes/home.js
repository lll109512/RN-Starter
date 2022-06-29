import { genStackNavigator } from "helper/navigation/navigationHelper";
import Home from "screens/Home";

export const HomeStack = () =>
    genStackNavigator([
        {
            name: 'HomePage',
            component: Home,
            options: ({i18n}) => ({
                title: i18n('homePage'),
                // headerShown: false,
            }),
        },
    ]);