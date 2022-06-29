import React from 'react'
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { Icon } from 'native-base';

const ImportIcon = createIconSetFromIcoMoon(
    require('assets/lineIcons/LineIconsRegular.json'),
    'LineIcons',
    'LineIcons.ttf',
);

export const LineIcon = (props) => <Icon as={ImportIcon} {...props} />;