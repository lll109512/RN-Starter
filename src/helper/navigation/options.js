import React from 'react';
import {Platform} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from '@expo/vector-icons/Ionicons';
import { LineIcon } from 'components/LineIcons';

// import {getHeaderBlurEffect} from '../../utils/designSystem';

export const screenDefaultOptions = () => ({
  headerShadowVisible: false,
  headerTintColor: 'black',

  // this setup makes large title work on iOS
  // ...Platform.select({
  //   ios: {
  //     headerLargeTitle: true,
  //     headerTransparent: true,
  //     // headerBlurEffect: getHeaderBlurEffect(),
  //   },
  // }),
});

export const tabBarDefaultOptions = (routeName) => ({
    headerShown: false,
    tabBarActiveTintColor: 'black',
    tabBarInactiveTintColor: 'gray',
    tabBarStyle: {backgroundColor: 'white', borderTopWidth: 0, elevation: 0},
    tabBarIcon: ({focused, color, size}) => (
        <LineIcon
            name={getIconName(routeName, focused)}
            size={size}
            color='secondary.600'
        />
    ),
});

const getIconName = (routeName, focused) => {
  if (routeName === 'MainNavigator') {
    return focused ? 'newspaper' : 'newspaper-outline';
  }
  if (routeName === 'ExampleNavigator') {
    return focused ? 'construct' : 'construct-outline';
  }
  if (routeName === 'SettingsNavigator') {
    return focused ? 'cog' : 'cog-outline';
  }

  return 'adobe';
};
