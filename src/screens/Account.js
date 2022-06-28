import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeLoadingScreen from 'components/SafeLoadingScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const Account = () => {
    return (
        <SafeLoadingScreen>
            <SafeAreaView edges={['top']}>
                <Text>Account</Text>
            </SafeAreaView>
        </SafeLoadingScreen>
    );
};

export default Account;
