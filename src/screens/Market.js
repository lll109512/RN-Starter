import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeLoadingScreen from 'components/SafeLoadingScreen';
import {SafeAreaView} from 'react-native-safe-area-context';

const Market = () => {
    return (
        <SafeLoadingScreen>
            <SafeAreaView edges={['top']}>
                <Text>Market</Text>
            </SafeAreaView>
        </SafeLoadingScreen>
    );
};

export default Market;
