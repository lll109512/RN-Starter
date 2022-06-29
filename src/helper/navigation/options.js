import React from 'react';
import {Platform} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { LineIcon } from 'components/LineIcons';

// import {getHeaderBlurEffect} from '../../utils/designSystem';

export const screenDefaultOptions = () => ({
  headerShadowVisible: false,
  // headerTintColor: 'black',

  // this setup makes large title work on iOS
  // ...Platform.select({
  //   ios: {
  //     headerLargeTitle: true,
  //     headerTransparent: true,
  //     // headerBlurEffect: getHeaderBlurEffect(),
  //   },
  // }),
});

export const tabBarDefaultOptions = ({
    routeName,
    activeIconColor,
    inactiveIconColor,
}) => ({
    headerShown:false,
    tabBarIcon: ({focused, color, size}) => (
        <LineIcon
            name={getIconName(routeName, focused)}
            size={size}
            color={focused ? activeIconColor : inactiveIconColor}
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
