import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import merge from 'lodash/merge';

import {screenDefaultOptions, tabBarDefaultOptions} from './options';
import {useColorScheme} from 'react-native';
import {useTranslation} from 'react-i18next';
import {enableScreens, enableFreeze} from 'react-native-screens';
import {useColorMode, useColorModeValue, useToken} from 'native-base';

enableFreeze(true);
enableScreens();

export const genStackNavigator = (screens, stackProps = {}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useColorScheme(); // needs to be here to correctly change nav bar appearance
    const {t} = useTranslation('app');
    const Stack = createNativeStackNavigator();
    const [
        bgColor,
        tintColor,
    ] = useToken('colors', [
        useColorModeValue('warmGray.50', 'dark.100'),
        useColorModeValue('dark.100', 'warmGray.50'),
    ]);
    const stackScreens = screens.map((it) => (
        <Stack.Screen
            key={it.name}
            name={it.name}
            component={it.component}
            options={merge(screenDefaultOptions(), it.options({i18n:t}))}
        />
    ));

    return (
        <Stack.Navigator
            {...merge(
                {
                    screenOptions: {
                        headerStyle: {
                            backgroundColor: bgColor,
                        },
                        headerTintColor: tintColor,
                    },
                },
                stackProps,
            )}>
            {stackScreens}
        </Stack.Navigator>
    );
};

export const genTabNavigator = (screens) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useColorScheme(); // needs to be here to correctly change tab bar appearance
    const {t} = useTranslation('app');
    const Tab = createBottomTabNavigator();
    const tabScreens = screens.map((it) => (
        <Tab.Screen
            key={it.name}
            name={it.name}
            component={it.component}
            options={it.options({i18n: t})}
        />
    ));
    
    const [
        bgColor,
        activeTextColor,
        inactiveTextColor,
        activeIconColor,
        inactiveIconColor,
    ] = useToken('colors', [
        useColorModeValue('warmGray.50', 'dark.100'),
        useColorModeValue('yellow.400', 'yellow.400'),
        useColorModeValue('warmGray.500', 'warmGray.400'),
        useColorModeValue('yellow.400', 'yellow.400'),
        useColorModeValue('warmGray.500', 'warmGray.400'),
    ]);

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                ...tabBarDefaultOptions({
                    routeName: route.name,
                    activeIconColor,
                    inactiveIconColor,
                }),
                tabBarActiveTintColor: activeTextColor,
                tabBarInactiveTintColor: inactiveTextColor,
                tabBarStyle: {
                    backgroundColor: bgColor,
                    borderTopWidth: 0,
                    elevation: 0,
                },
            })}>
            {tabScreens}
        </Tab.Navigator>
    );
};

export const genRootNavigator = (app, modals) => {
    const RootStack = createNativeStackNavigator();
    const appScreen = <RootStack.Screen name="App" component={app} />;
    const modalScreens = modals.map((m) => (
        <RootStack.Screen key={m.name} name={m.name} component={m.component} />
    ));

    return (
        <RootStack.Navigator screenOptions={{headerShown: false}}>
            <RootStack.Group>{appScreen}</RootStack.Group>

            <RootStack.Group screenOptions={{presentation: 'modal'}}>
                {modalScreens}
            </RootStack.Group>
        </RootStack.Navigator>
    );
};
