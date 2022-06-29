import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeLoadingScreen from 'components/SafeLoadingScreen';
import {SafeAreaView} from 'react-native-safe-area-context';

const Me = () => {
    return (
        <SafeLoadingScreen>
            <SafeAreaView edges={['top']}>
                <Text>Me</Text>
            </SafeAreaView>
        </SafeLoadingScreen>
    );
};

export default Me;
