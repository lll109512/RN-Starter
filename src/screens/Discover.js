import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeLoadingScreen from 'components/SafeLoadingScreen';
import {SafeAreaView} from 'react-native-safe-area-context';

const Discover = () => {
    return (
        <SafeLoadingScreen>
            <SafeAreaView edges={['top']}>
                <Text>Discover</Text>
            </SafeAreaView>
        </SafeLoadingScreen>
    );
};

export default Discover;
