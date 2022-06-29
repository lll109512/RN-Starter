import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeLoadingScreen from 'components/SafeLoadingScreen';
import {SafeAreaView} from 'react-native-safe-area-context';
import { useLocale } from 'hooks/useLocale';
import { Box, Button } from 'native-base';

const Me = () => {
    const {changeLanguage} = useLocale()
    return (
        <SafeLoadingScreen>
            <SafeAreaView edges={['top']}>
                <Text>Me</Text>
                <Button onPress={() => changeLanguage('zh-CN')}>
                    zh-CN
                </Button>
                <Button onPress={() => changeLanguage('en-US')}>
                    en-US
                </Button>
            </SafeAreaView>
        </SafeLoadingScreen>
    );
};

export default Me;
