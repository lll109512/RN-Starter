import {designSystemColors} from 'config/theme';
import {Box, Center, Text, useColorModeValue, VStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';

const ErrorPage = (props) => {
    const {text} = props;
    const {t} = useTranslation('app');
    return (
        <Center
            flex={1}
            bg={useColorModeValue(
                designSystemColors.light.white,
                designSystemColors.dark.white,
            )}>
            <Text>{text || t('pageErrorText')}</Text>
        </Center>
    );
};

export default ErrorPage;
